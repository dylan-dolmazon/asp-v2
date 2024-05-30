import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1'

// Valeur par défaut si l'API prend trop de temps à répondre
const defaultCountry = {
  name: 'France',
  code: 'FR',
  continent: 'Europe',
  region: 'Western Europe',
  flagUrl: 'https://flagcdn.com/fr.svg',
}

export const getCountry = async (code: string) => {
  try {
    const country = await axios.get(`${apiUrl}/alpha/${code}`, { timeout: 3000 }) // Timeout de 3 secondes

    return {
      name: country.data[0].translations.fra.common,
      code: country.data[0].cca2,
      continent: country.data[0].region,
      region: country.data[0].subregion,
      flagUrl: country.data[0].flags.svg,
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error("La requête a dépassé le temps d'attente")
    } else {
      console.error("Une erreur s'est produite :", error.message)
    }
    return defaultCountry
  }
}
