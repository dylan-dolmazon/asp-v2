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
const CompetsController = () => import('#controllers/compets_controller')
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
router.get('players/:id/stats', [PlayersController, 'showWhitStats'])
router.resource('/players', PlayersController)

// ------------------- User routes ------------------- //
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('register/admin', [AuthController, 'registerAdmin'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('user')

// ------------------- Countries routes ------------------- //
router.get('/countries', [CountriesController, 'index'])

// ------------------- Dofas routes ------------------- //
router
  .group(() => {
    router.get(':competId/ranking/:poolId', [DofasController, 'getClubRank'])
    router.get(':competId/results/:poolId', [DofasController, 'getClubResults'])
    router.get(':competId/calendar/:poolId', [DofasController, 'getClubCalendar'])
    router.get(':competId', [DofasController, 'getCompetInfos'])
  })
  .prefix('dofa/compet')

// ------------------- Compet routes ------------------- //
router.post('compets/create', [CompetsController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('compets', [CompetsController, 'index'])
