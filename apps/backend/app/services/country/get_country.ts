import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1'

export const getCountry = async (code: string) => {
  //const country = await axios.get(`${apiUrl}/alpha/${code}`)

  // return {
  //   name: country.data[0].translations.fra.common,
  //   code: country.data.cca2,
  //   continent: country.data[0].region,
  //   region: country.data[0].subregion,
  //   flagUrl: country.data[0].flags.svg,
  // }
  return {
    name: 'France',
    code: 'FR',
    continent: 'Europe',
    region: 'Western Europe',
    flagUrl: 'https://flagcdn.com/fr.svg',
  }
}
