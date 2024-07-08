import Compet from '#models/compet'
import { createCompetValidator } from '#validators/Compet/create'
import { updateCompetValidator } from '#validators/Compet/update'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import env from '#start/env'
import axios from 'axios'
import District from '#models/district'

export default class CompetsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCompetValidator)
    payload.order =
      payload.order ||
      (await db
        .from('compets')
        .select(db.raw('MAX("order")'))
        .first()
        .then((res) => res.max + 1))

    const dofaResponse = await axios.get(
      `${env.get('DOFA_URL')}/api/compets/${payload.number}.json`
    )

    const district = await getDistrict(dofaResponse.data.cdg)

    const competData = {
      name: dofaResponse.data.name,
      shortName: dofaResponse.data.shortname,
      number: payload.number,
      order: payload.order,
    }

    const addedCompet = new Compet()
    addedCompet.fill(competData)
    await addedCompet.related('district').associate(district)
    await addedCompet.save()

    return response.status(201).send(addedCompet)
  }

  async index({ request }: HttpContext) {
    const { limit = 100 } = request.qs()
    return Compet.query().orderBy('order', 'asc').paginate(1, limit)
  }

  async newFavorite({ params }: HttpContext) {
    const { id } = params
    const maxOrder = await db
      .from('compets')
      .select(db.raw('MAX("order")'))
      .first()
      .then((res) => res.max + 1)

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
    const dofaResponse = await axios.get(`${env.get('DOFA_URL')}/api/compets/${payload.number}`)

    const district = await getDistrict(dofaResponse.data.cdg)

    if (compet.districtId !== district.id) {
      await compet.related('district').associate(district)
    }

    compet.merge({
      ...payload,
      name: dofaResponse.data.name,
      shortName: dofaResponse.data.shortname,
    })
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

const getDistrict = async (datas: {
  cg_no: number
  name: string
  type_label: string
}): Promise<District> => {
  let district = await District.findBy('number', datas.cg_no)

  if (!district) {
    district = await District.create({
      number: datas.cg_no,
      name: datas.name,
      level: datas.type_label,
    })
    district.save()
  }

  return district
}
