import Compet from '#models/compet'
import { createCompetValidator } from '#validators/Compet/create'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompetsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCompetValidator)
    return response.status(201).send(Compet.create(payload))
  }

  async index(_ctx: HttpContext) {
    return Compet.all()
  }
}
