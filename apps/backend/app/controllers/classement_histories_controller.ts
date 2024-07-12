import { HistorySaveAll } from '#validators/History/save_all'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Compet from '#models/compet'
import ClassementHistory from '#models/classement_history'
import { transformChampionnat } from '#services/dofa/transform_championnat'
import { HistoryCheckAll } from '#validators/History/check'
import EquipeHistory from '#models/equipe_history'
import { ClubInfo } from '#types/club_types.js'

export default class ClassementHistoriesController {
  async save({ params, response }: HttpContext) {
    const competId = params.id

    const result = await axios.get(`${env.get('DOFA_URL')}/api/compets/${competId}`)

    const championnatInfos = transformChampionnat(result.data)

    const championnatClassments = await Promise.all(
      championnatInfos.pools.map(async (pool) => {
        const clubsRank = await axios.get(
          `${env.get('DOFA_URL')}/api/compets/${competId}/phases/1/poules/${pool.number}/classement_journees`
        )

        const compet = await Compet.findByOrFail('number', competId)

        const datas = await Promise.all(
          clubsRank.data['hydra:member'].map(async (club: any) => {
            return await transformClassment(club, compet)
          })
        )

        return datas
      })
    )

    return response.ok(championnatClassments)
  }

  async saveAll({ request, response }: HttpContext) {
    const numbers = await request.validateUsing(HistorySaveAll)

    const allDatas = await Promise.all(
      numbers.competsId.map(async (competId) => {
        const result = await axios.get(`${env.get('DOFA_URL')}/api/compets/${competId}`)
        const championnatInfos = transformChampionnat(result.data)

        const championnatClassments = await Promise.all(
          championnatInfos.pools.map(async (pool) => {
            const clubsRank = await axios.get(
              `${env.get('DOFA_URL')}/api/compets/${competId}/phases/1/poules/${pool.number}/classement_journees`
            )

            const compet = await Compet.findByOrFail('number', competId)

            const datas = await Promise.all(
              clubsRank.data['hydra:member'].map(async (club: any) => {
                return await transformClassment(club, compet)
              })
            )

            return datas
          })
        )
        return championnatClassments
      })
    )

    return response.ok(allDatas)
  }

  async checkHistories({ request, response }: HttpContext) {
    const datas = await request.validateUsing(HistoryCheckAll)

    const alreadyExists = await Promise.all(
      datas.competsId.map(async (competId) => {
        const compet = await Compet.findByOrFail('number', competId)

        const classements = await ClassementHistory.query()
          .where('saison', datas.season)
          .andWhere('compet_id', compet.id)

        if (classements.length > 0) {
          return compet
        } else {
          return null
        }
      })
    )

    return response.ok(alreadyExists.filter((result) => result !== null))
  }

  async index({ request, response }: HttpContext) {
    const { competId } = request.qs()

    const compet = await Compet.findOrFail(competId)
    await compet.load('district')

    const results = await ClassementHistory.query().where('compet_id', competId)

    let transformedResults: {
      competName: string
      districtName: string
      pool: string
      saison: string
      teams: ClubInfo[]
    }[] = []
    const addTeam = (team: ClassementHistory, pool: string) => {
      const teamData = {
        name: team.equipeHistory.name,
        categoryLabel: team.equipeHistory.categoryLabel,
        ranking: team.rank,
        points: team.points,
        goalFor: team.goalFor,
        goalAgainst: team.goalAgainst,
        goalDifference: team.goalFor - team.goalAgainst,
        win: team.win,
        draw: team.draw,
        loss: team.loss,
        forfeit: team.forfeit,
        penality: team.penality,
        totalMatchs: team.totalMatchs,
      }
      transformedResults = transformedResults.map((item) => {
        if (item.pool === pool) {
          item.teams.push(teamData)
        }
        return item
      })
    }
    await Promise.all(
      results.map(async (result) => {
        // Load related models
        await result.load('compet')
        await result.load('equipeHistory')
        await result.compet.load('district')

        // Check if the pool and saison combination already exists in transformedResults
        if (
          !transformedResults.find((item) => {
            return item.pool === result.pool && item.saison === result.saison
          })
        ) {
          // Add to the transformedResults array
          transformedResults.push({
            competName: result.compet.name,
            districtName: result.compet.district.name,
            pool: result.pool,
            saison: result.saison,
            teams: [],
          })
        }
        // Add the team to the pool
        addTeam(result, result.pool)
      })
    )

    transformedResults.forEach((item) => {
      item.teams.sort((a, b) => {
        if (a.ranking < b.ranking) {
          return -1
        }
        if (a.ranking > b.ranking) {
          return 1
        }
        return 0
      })
    })
    return response.ok(transformedResults)
  }
}

const transformClassment = async (data: any, compet: Compet) => {
  let equipeHistory = await EquipeHistory.findBy('name', data.equipe.short_name)

  if (!equipeHistory) {
    const newEquipe = new EquipeHistory()
    newEquipe.name = data.equipe.short_name
    newEquipe.categoryLabel = data.equipe.category_label
    newEquipe.type = data.equipe.type
    newEquipe.pool = data.poule.name
    newEquipe.number = data.equipe.club.cl_no

    await newEquipe.related('compet').associate(compet)
    await newEquipe.save()
    equipeHistory = newEquipe
  }

  const currentSeason = `${data.season} - ${data.season + 1}`

  let classementHistory = await ClassementHistory.query()
    .where('compet_id', compet.id)
    .andWhere('saison', currentSeason)
    .andWhere('pool', data.poule.name)
    .andWhere('equipe_history_id', equipeHistory.id)
    .first()

  if (!classementHistory) {
    const newClassement = new ClassementHistory()
    newClassement.saison = currentSeason
    newClassement.totalMatchs = data.total_games_count
    newClassement.points = data.point_count
    newClassement.goalFor = data.goals_for_count
    newClassement.goalAgainst = data.goals_against_count
    newClassement.rank = data.rank
    newClassement.win = data.won_games_count
    newClassement.draw = data.draw_games_count
    newClassement.loss = data.lost_games_count
    newClassement.forfeit = data.forfeits_games_count
    newClassement.penality = data.penalty_point_count
    newClassement.pool = data.poule.name

    await newClassement.related('equipeHistory').associate(equipeHistory)
    await newClassement.related('compet').associate(compet)

    await newClassement.save()
    classementHistory = newClassement
  } else {
    classementHistory.totalMatchs = data.total_games_count
    classementHistory.points = data.point_count
    classementHistory.goalFor = data.goals_for_count
    classementHistory.goalAgainst = data.goals_against_count
    classementHistory.rank = data.rank
    classementHistory.win = data.won_games_count
    classementHistory.draw = data.draw_games_count
    classementHistory.loss = data.lost_games_count
    classementHistory.forfeit = data.forfeits_games_count
    classementHistory.penality = data.penalty_point_count

    await classementHistory.save()
  }
  return classementHistory
}
