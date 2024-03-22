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
}
