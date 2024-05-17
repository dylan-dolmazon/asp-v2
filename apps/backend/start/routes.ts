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
router.post('players/check', [PlayersController, 'alreadyExists'])
router.get('players/:id/stats', [PlayersController, 'showWhitStats'])
router.post('players', [PlayersController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('players', [PlayersController, 'index'])
router.get('players/:id', [PlayersController, 'show'])
router.put('players/:id', [PlayersController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('players/:id', [PlayersController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

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
router.delete('compets/:id', [CompetsController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.put('compets/new-favorite/:id', [CompetsController, 'newFavorite']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.put('compets/:id', [CompetsController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('compets', [CompetsController, 'index'])
