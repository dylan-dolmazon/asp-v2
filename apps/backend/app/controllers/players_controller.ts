import Player from '#models/player'
import { createPlayerValidator } from '#validators/Player/create'
import { updatePlayerValidator } from '#validators/Player/update'
import { updateManyPlayerValidator } from '#validators/Player/update_many'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlayersController {
  async index(_ctx: HttpContext) {
    return Player.all()
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
