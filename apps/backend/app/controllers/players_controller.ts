import Player from '#models/player'
import { createPlayerValidator } from '#validators/Player/create'
import { updatePlayerValidator } from '#validators/Player/update'
import { updateManyPlayerValidator } from '#validators/Player/update_many'
import type { HttpContext } from '@adonisjs/core/http'
import { getCountry } from '#services/country/get_country'
import { getPosition } from '../../../frontend/utils/functions/position/getPosition.ts'

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
          fullname: `${player.firstname} ${player.lastname}`,
          positionLabel: getPosition(player.position),
          country: await getCountry(player.nationality),
        }
      })
    )

    return { data: modifiedPlayers, meta: players.serialize().meta }
  }

  async show({ params }: HttpContext) {
    const { id } = params
    return Player.findOrFail(id)
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
