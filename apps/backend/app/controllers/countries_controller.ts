import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1'

// Valeur par défaut si l'API prend trop de temps à répondre
const defaultCountries = [
  {
    name: 'France',
    code: 'FR',
    continent: 'Europe',
    region: 'Western Europe',
    flagUrl: 'https://flagcdn.com/fr.svg',
  },
]

export default class CountriesController {
  async index(_ctx: HttpContext) {
    try {
      const countries = await axios.get(`${apiUrl}/region/europe`, { timeout: 3000 })

      return countries.data.map((country: any) => ({
        name: country.translations.fra.common,
        code: country.cca2,
        continent: country.region,
        region: country.subregion,
        flagUrl: country.flags.svg,
      }))
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error("La requête a dépassé le temps d'attente")
      } else {
        console.error("Une erreur s'est produite :", error.message)
      }
      return defaultCountries
    }
  }
}
