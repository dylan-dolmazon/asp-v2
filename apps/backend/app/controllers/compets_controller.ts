import Compet from '#models/compet'
import { createCompetValidator } from '#validators/Compet/create'
import { updateCompetValidator } from '#validators/Compet/update'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CompetsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCompetValidator)
    payload.order =
      payload.order || (await db.from('compets').select(db.raw('MAX("order")')).first()).max + 1
    const addedCompet = await Compet.create(payload)
    return response.status(201).send(addedCompet)
  }

  async index({ request }: HttpContext) {
    const { limit = 100 } = request.qs()
    return Compet.query().orderBy('order', 'asc').paginate(1, limit)
  }

  async newFavorite({ params }: HttpContext) {
    const { id } = params
    const maxOrder = (await db.from('compets').select(db.raw('MAX("order")')).first()).max + 1

    const oldFavorite = await Compet.findByOrFail('order', 1)
    oldFavorite.order = maxOrder
    await oldFavorite.save()

    const newFavorite = await Compet.findOrFail(id)
    const order = newFavorite.order
    newFavorite.order = 1
    await newFavorite.save()

    oldFavorite.order = order
    await oldFavorite.save()
    return { oldFavorite, newFavorite }
  }

  async update({ request, params }: HttpContext) {
    const compet = await Compet.findOrFail(params.id)
    const payload = await request.validateUsing(updateCompetValidator)
    compet.merge(payload)
    await compet.save()
    return compet
  }

  async destroy({ params, response }: HttpContext) {
    const compet = await Compet.findOrFail(params.id)
    await compet.delete()

    await Compet.query().where('order', '>', compet.order).decrement('order')
    return response.status(204)
  }
}
