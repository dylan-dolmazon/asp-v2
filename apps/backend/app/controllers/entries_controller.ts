import type { HttpContext } from '@adonisjs/core/http'
import Entrie from '#models/entrie'
import { createEntrieValidator, updateEntrieValidator } from '#validators/entrie'

export default class EntriesController {
  async index(_ctx: HttpContext) {
    return Entrie.all()
  }

  async show({ params }: HttpContext) {
    const { id } = params
    return Entrie.findOrFail(id)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createEntrieValidator)
    return Entrie.create(payload)
  }

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updateEntrieValidator)
    const entry = await Entrie.findOrFail(params.id)
    entry.merge(payload)
    return entry.save()
  }

  async destroy({ params }: HttpContext) {
    const entry = await Entrie.findOrFail(params.id)
    return entry.delete()
  }
}
