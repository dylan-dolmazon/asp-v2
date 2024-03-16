import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1'

export default class CountriesController {
  async index(_ctx: HttpContext) {
    const countries = await axios.get(`${apiUrl}/region/europe`)

    return countries.data.map((country: any) => ({
      name: country.translations.fra.common,
      code: country.cca2,
      continent: country.region,
      region: country.subregion,
      flagUrl: country.flags.svg,
    }))
  }

  async show({ params }: HttpContext) {
    const { code } = params
    const country = await axios.get(`${apiUrl}/alpha/${code}`)

    return {
      name: country.data[0].translations.fra.common,
      code: country.data.cca2,
      continent: country.data[0].region,
      region: country.data[0].subregion,
      flagUrl: country.data[0].flags.svg,
    }
  }
}
