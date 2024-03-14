/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const EntriesController = () => import('#controllers/entries_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/entries', EntriesController)
