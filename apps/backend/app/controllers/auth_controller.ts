import User from '#models/user'
import { sendEmail } from '#services/email/send'
import { loginUserValidator } from '#validators/Auth/login'
import { storeUserValidator } from '#validators/Auth/store'
import { updateUserValidator, updateUserToAdminValidator } from '#validators/Auth/update'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class AuthController {
  async index({ request }: HttpContext) {
    const { page = 1, limit = 10, name } = request.qs()
    const query = User.query().orderBy('createdAt', 'desc')

    if (name) {
      const nameTerms = name
        .split(' ')
        .map((term: string) => term.trim())
        .filter((term: string) => term.length > 0)

      query.where((builder) => {
        nameTerms.forEach((term: string) => {
          builder.orWhere((subBuilder) => {
            subBuilder
              .where('firstname', 'ilike', `%${term}%`)
              .orWhere('lastname', 'ilike', `%${term}%`)
              .orWhere('username', 'ilike', `%${term}%`)
          })
        })
      })
    }
    return await query.paginate(page, limit)
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeUserValidator)

    sendEmail(
      'inscription',
      'Bienvenue sur ASP !',
      [payload.email],
      [
        { key: 'user_name', value: payload.firstname },
        { key: 'user_role', value: 'Utilisateur' },
      ]
    )

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

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    const userInfos = await User.findOrFail(params.id)
    const userLogin = await User.verifyCredentials(userInfos.email, payload.password)

    const emailToUpdate = payload.email && userLogin.email !== payload.email
    const usernameToUpdate = payload.username && userLogin.username !== payload.username
    let messages: { message: string }[] = []

    if (emailToUpdate) {
      const exist = await User.findBy('email', payload.email)

      if (exist !== null) messages.push({ message: 'Nouvel e-mail renseigné déjà enregistré' })
    }

    if (usernameToUpdate) {
      const exist = await User.findBy('username', payload.username)

      if (exist !== null) messages.push({ message: 'Nouvel username renseigné déjà enregistré' })
    }

    if (messages.length > 0) {
      return response.status(409).send({
        errors: messages,
      })
    }

    const { password, ...payloadWithoutPassword } = payload

    userLogin.merge(payloadWithoutPassword)
    await userLogin.save()
    return userLogin
  }

  async updateToAdmin({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateUserToAdminValidator)
    const roles = request.header('Abilities')?.split(',')

    if (!roles?.includes('moderator') || payload.key !== env.get('ADMIN_SECRET_KEY')) {
      return response.status(401).send({
        errors: [{ message: "Vous n'êtes pas autorisé à effectuer cette action" }],
      })
    }

    payload.users.forEach(async ({ username, role }) => {
      const user = await User.findByOrFail('username', username)
      user.merge({ role })
      await user.save()
    })

    return response.ok({
      messages: [{ message: 'Tout les utilisateurs ont bien étaient modifié' }],
    })
  }
}
