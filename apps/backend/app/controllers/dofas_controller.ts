import { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import dayjs from 'dayjs'
import { ClubInfo, Game } from '#types/club_types.js'
import env from '#start/env'
import { transformChampionnat } from '#services/dofa/transform_championnat'

export default class DofasController {
  async getClubRank({ params }: HttpContext) {
    const { competId, poolId } = params
    const clubRank = await axios.get(
      `${env.get('DOFA_URL')}/api/compets/${competId}/phases/1/poules/${poolId}/classement_journees`
    )
    return transformClassment(clubRank.data['hydra:member'])
  }

  async getClubCalendar({ request, params }: HttpContext) {
    const { page = 1 } = request.qs()
    const { competId, poolId } = params

    const dates = getXthSunday(page - 1)

    const endpoint = `calendrier?ma_dat%5Bbefore%5D=${dates[1]}&ma_dat%5Bafter%5D=${dates[0]}`

    const response = await axios.get(
      `${env.get('DOFA_URL')}/api/compets/${competId}/phases/1/poules/${poolId}/${endpoint}`
    )

    const transformedClubs = await Promise.all(await transformClubs(response.data['hydra:member']))

    return { clubs: transformCalendar(transformedClubs), dates: { from: dates[0], to: dates[1] } }
  }

  async getClubResults({ request, params }: HttpContext) {
    const { page = 0 } = request.qs()
    const { competId, poolId } = params

    const dates = getXthSunday(page, false)

    const endpoint = `resultat?ma_dat%5Bbefore%5D=${dates[1]}&ma_dat%5Bafter%5D=${dates[0]}`

    const response = await axios.get(
      `${env.get('DOFA_URL')}/api/compets/${competId}/phases/1/poules/${poolId}/${endpoint}`
    )

    const transformedClubs = await Promise.all(await transformClubs(response.data['hydra:member']))

    return { clubs: transformCalendar(transformedClubs), dates: { from: dates[0], to: dates[1] } }
  }

  async getCompetInfos({ params }: HttpContext) {
    const { competId } = params
    const result = await axios.get(`${env.get('DOFA_URL')}/api/compets/${competId}`)
    return transformChampionnat(result.data)
  }
}

const transformClubs = async (data: any): Promise<ClubInfo[]> => {
  return await data.map(async (club: any) => {
    if (!club.home || !club.away) {
      return {
        ...club,
        matchSheet: null,
      }
    }

    const homeClubName = await axios.get(`${env.get('DOFA_URL')}${club.home.club['@id']}`)

    const awayClubName = await axios.get(`${env.get('DOFA_URL')}${club.away.club['@id']}`)

    return {
      ...club,
      matchSheet: `https://www.fff.fr/competition/match/${
        club.ma_no
      }-${transformToSlug(homeClubName.data.name)}-${transformToSlug(awayClubName.data.name)}.html`,
    }
  })
}

const transformToSlug = (input: string): string => {
  const withoutTrailingDot = input.replace(/\.$/, '') // Supprimer le point en fin de chaîne
  const replacedSpacesAndDots = withoutTrailingDot.replace(/[\s.]+/g, '-')
  return replacedSpacesAndDots.toLowerCase()
}

const transformCalendar = (data: any): Game[] => {
  return data.map((game: any) => {
    // Check if game.away is null
    const away = game.away
      ? {
          club: {
            '@id': game.away.club['@id'],
            '@type': game.away.club['@type'],
            'cl_no': game.away.club.cl_no,
            'logo': game.away.club.logo,
          },
          name: `${game.away.short_name}${game.away.code > 1 ? ' ' + game.away.code : ''}`,
          category_label: game.away.category_label,
        }
      : null

    // Check if game.home is null
    const home = game.home
      ? {
          club: {
            '@id': game.home.club['@id'],
            '@type': game.home.club['@type'],
            'cl_no': game.home.club.cl_no,
            'logo': game.home.club.logo,
          },
          name: `${game.home.short_name}${game.home.code > 1 ? ' ' + game.home.code : ''}`,
          category_label: game.home.category_label,
        }
      : null

    const referers = game.match_membres
      ? game.match_membres.map((referer: any) => ({
          lastname: referer.nom,
          firstname: referer.prenom,
          position: referer.label_position,
        }))
      : null

    const stade = game.terrain
      ? {
          name: game.terrain.name,
          street: game.terrain.address,
          postalCode: game.terrain.zip_code,
          city: game.terrain.city,
          surface: game.terrain.libelle_surface,
        }
      : null

    const score =
      game.away_score !== null && game.home_score !== null
        ? {
            away: game.away_score,
            home: game.home_score,
          }
        : null

    return {
      date: game.date,
      time: game.time,
      status: game.status_label,
      score,
      home,
      away,
      referers,
      stade,
      journee: game.poule_journee.number,
      matchSheet: game.matchSheet,
    }
  })
}

const transformClassment = (data: any): ClubInfo[] => {
  return data.map((club: any) => ({
    club: {
      '@id': club.equipe['@id'],
      '@type': club.equipe['@type'],
      'cl_no': club.equipe.club.cl_no,
    },
    name: `${club.equipe.short_name}${club.equipe.code > 1 ? ' ' + club.equipe.code : ''}`,
    categoryLabel: club.equipe.category_label,
    ranking: club.rank,
    goalFor: club.goals_for_count,
    goalAgainst: club.goals_against_count,
    goalDifference: club.goals_for_count - club.goals_against_count,
    win: club.won_games_count,
    draw: club.draw_games_count,
    loss: club.lost_games_count,
    totalMatchs: club.total_games_count,
    points: club.point_count,
  }))
}

const getXthSunday = (x: number, after: boolean = true): string[] => {
  const currentDay = dayjs()

  // Calculer le nombre de jours jusqu'au prochain dimanche
  const daysUntilNextSunday = (7 - currentDay.day()) % 7

  // Calculer les jours nécessaires pour atteindre le x-ème dimanche avant ou après
  const daysToAdd = after ? daysUntilNextSunday + 7 * x : daysUntilNextSunday - 7 * x

  // Ajouter ou soustraire les jours pour obtenir la date cible
  const targetSunday = currentDay.add(daysToAdd, 'day')

  // Retourner la date du x-ème dimanche
  return [targetSunday.subtract(6, 'days').format('YYYY-MM-DD'), targetSunday.format('YYYY-MM-DD')]
}
