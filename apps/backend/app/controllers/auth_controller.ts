import User from '#models/user'
import { loginUserValidator } from '#validators/Auth/login_user'
import { storeAdminValidator, storeUserValidator } from '#validators/Auth/store_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeUserValidator)

    return response.status(201).send(User.create({ ...payload, role: 'user' }))
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, [user.role])
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async registerAdmin({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeAdminValidator)

    const { key, ...datas } = payload

    return response.status(201).send(User.create({ ...datas, role: 'admin' }))
  }
}
