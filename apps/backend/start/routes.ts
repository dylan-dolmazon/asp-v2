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
import { middleware } from '#start/kernel'
const DofasController = () => import('#controllers/dofas_controller')
const CountriesController = () => import('#controllers/countries_controller')
const PlayersController = () => import('#controllers/players_controller')

router
  .get('/', async () => {
    return { congratulation: 'You can acces this route' }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

// ------------------- Players routes ------------------- //
router.get('players/search', [PlayersController, 'search'])
router.put('players/updates', [PlayersController, 'updateMany'])
router.get('players/ranking', [PlayersController, 'getRanking'])
router.resource('/players', PlayersController)

// ------------------- User routes ------------------- //
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('user')

// ------------------- Countries routes ------------------- //
router.get('/countries', [CountriesController, 'index'])

// ------------------- Dofas routes ------------------- //
router
  .group(() => {
    router.get('compet/:competId/ranking/:poolId', [DofasController, 'getClubRank'])
    router.get('compet/:competId/results/:poolId', [DofasController, 'getClubResults'])
    router.get('compet/:competId/calendar/:poolId', [DofasController, 'getClubResults'])
    router.get('compet/:competId', [DofasController, 'getCompetInfos'])
  })
  .prefix('dofa')
