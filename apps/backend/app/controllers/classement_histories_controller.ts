import { HistorySaveAll } from '#validators/History/save_all'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Compet from '#models/compet'
import EquipeHistory from '#models/equipe_history'
import ClassementHistory from '#models/classement_history'
import { transformChampionnat } from '#services/dofa/transform_championnat'

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

    const clubsRank = await axios.get(
      `${env.get('DOFA_URL')}/api/compets/${numbers.competsId[0]}/phases/1/poules/1/classement_journees`
    )
    const datas = clubsRank.data['hydra:member'].map((club: any) => {
      //return transformClassment(club, numbers.competsId[0].toString())
    })

    return response.ok(datas)
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
  }
  return classementHistory
}
