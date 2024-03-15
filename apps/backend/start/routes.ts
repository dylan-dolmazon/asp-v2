/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
const EntriesController = () => import('#controllers/entries_controller')
import { middleware } from '#start/kernel'

router
  .get('/', async () => {
    return { congratulation: 'You can acces this route' }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.resource('/entries', EntriesController)

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('user')
