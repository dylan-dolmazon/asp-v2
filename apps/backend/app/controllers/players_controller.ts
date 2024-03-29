import Player from '#models/player'
import { createPlayerValidator } from '#validators/Player/create'
import { updatePlayerValidator } from '#validators/Player/update'
import { updateManyPlayerValidator } from '#validators/Player/update_many'
import type { HttpContext } from '@adonisjs/core/http'
import { getCountry } from '#services/country/get_country'
import db from '@adonisjs/lucid/services/db'

export default class PlayersController {
  async index({ request }: HttpContext) {
    const { page = 1 } = request.qs()
    const { limit = 10 } = request.qs()

    return await Player.query().orderBy('createdAt', 'desc').paginate(page, limit)
  }

  async getRanking({ request }: HttpContext) {
    const { page = 1 } = request.qs()
    const { limit = 10 } = request.qs()
    const players = await Player.query().orderBy('goalsscored', 'desc').paginate(page, limit)

    // Utilisez Promise.all pour attendre que toutes les promesses se résolvent
    const modifiedPlayers = await Promise.all(
      players.serialize().data.map(async (player) => {
        return {
          ...player,
          country: await getCountry(player.nationality),
        }
      })
    )

    return { data: modifiedPlayers, meta: players.serialize().meta }
  }

  async show({ params }: HttpContext) {
    const { id } = params

    let player = await Player.findOrFail(id)
    const country = await getCountry(player.nationality)

    return { ...player.serialize(), country }
  }

  async showWhitStats({ params }: HttpContext) {
    const { id } = params

    let player = await Player.findOrFail(id)
    const country = await getCountry(player.nationality)

    const playerStats = await db
      .from('players')
      .select(
        db.raw('ROUND(AVG(goalsscored)) AS goalsAverage'),

        db.raw('ROUND(AVG(assists)) AS assistsAverage'),
        db.raw('ROUND(AVG(yellowcards)) AS yellowcardsAverage'),
        db.raw('ROUND(AVG(redcards)) AS redcardsAverage'),
        db.raw('ROUND(AVG(age)) AS ageAverage'),
        db.raw('SUM(CASE WHEN goalsscored > ? THEN 1 ELSE 0 END) AS goalsRank', [
          player.goalsscored,
        ]),
        db.raw('SUM(CASE WHEN assists > ? THEN 1 ELSE 0 END) AS assistsRank', [player.assists]),
        db.raw('SUM(CASE WHEN yellowcards > ? THEN 1 ELSE 0 END) AS yellowcardsRank', [
          player.yellowcards,
        ]),
        db.raw('SUM(CASE WHEN redcards > ? THEN 1 ELSE 0 END) AS redcardsRank', [player.redcards]),
        db.raw('(SELECT COUNT(*) FROM players) AS totalPlayersCount')
      )
      .first()

    return {
      player: {
        ...player.serialize(),
        country,
      },
      stats: {
        clubAverage: {
          goalsscored: Number.parseInt(playerStats['goalsaverage']),
          assists: Number.parseInt(playerStats['assistsaverage']),
          yellowcards: Number.parseInt(playerStats['yellowcardsaverage']),
          redcards: Number.parseInt(playerStats['redcardsaverage']),
          age: Number.parseInt(playerStats['ageaverage']),
        },
        stats: {
          goalsscored: Number.parseInt(playerStats['goalsrank'] + 1),
          assists: Number.parseInt(playerStats['assistsrank'] + 1),
          yellowcards: Number.parseInt(playerStats['yellowcardsrank'] + 1),
          redcards: Number.parseInt(playerStats['redcardsrank'] + 1),
          totalPlayersCount: Number.parseInt(playerStats['totalplayerscount']),
        },
      },
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPlayerValidator)
    return response.status(201).send(Player.create(payload))
  }

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updatePlayerValidator)
    const entry = await Player.findOrFail(params.id)
    entry.merge(payload)
    return entry.save()
  }

  async updateMany({ request }: HttpContext) {
    const payload = await request.validateUsing(updateManyPlayerValidator)
    const updatedPlayersPromises = payload.players.map(async (entry) => {
      const player = await Player.findOrFail(entry.id)
      player.merge(entry)
      return await player.save()
    })

    const updatedPlayers = await Promise.all(updatedPlayersPromises)

    return { players: updatedPlayers }
  }

  async destroy({ params, response }: HttpContext) {
    const entry = await Player.findOrFail(params.id)
    entry.delete()
    return response.status(204)
  }

  async search({ request }: HttpContext) {
    const { name } = request.qs()
    return Player.query()
      .where('firstname', 'ilike', `%${name}%`)
      .orWhere('lastname', 'ilike', `%${name}%`)
  }
}
