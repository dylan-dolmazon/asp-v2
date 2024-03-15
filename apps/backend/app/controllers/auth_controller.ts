import User from '#models/user'
import { loginUserValidator } from '#validators/Auth/login_user'
import { storeUserValidator } from '#validators/Auth/store_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(storeUserValidator)

    return User.create(payload)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
}
