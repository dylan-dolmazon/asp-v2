import Token from '#models/token'
import User from '#models/user'
import { sendEmail } from '#services/email/send'
import env from '#start/env'
import { checkLinkValidator } from '#validators/ForgotPassword/check_link'
import { forgotPasswordValidator } from '#validators/ForgotPassword/forgot'
import { resetPasswordValidator } from '#validators/ForgotPassword/reset'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ResetPasswordController {
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findByOrFail('email', email)

    const token = stringHelpers.generateRandom(64)
    const url = `${env.get('FRONTEND_URL')}/password/reset?token=${token}&email=${email}`

    await Token.create({
      token,
      email: user.email,
      expiriesAt: DateTime.now().plus({ hours: 1 }),
    })

    sendEmail(
      'mot-de-passe-oublie',
      'Voici votre lien de réinitialisation de mot de passe.',
      [user.email],
      [{ key: 'link', value: url }]
    )

    return response
      .status(202)
      .send({ success: [{ message: 'E-mail de réinitialisation de mot de passe envoyé.' }] })
  }

  async checkLink({ request, response }: HttpContext) {
    const { email, token } = await request.validateUsing(checkLinkValidator)

    const tokenInstance = await Token.findBy('token', token)

    if (
      !tokenInstance ||
      !!tokenInstance.isUsed ||
      tokenInstance.email !== email ||
      DateTime.now() > tokenInstance.expiriesAt
    ) {
      return response.status(200).send({ error: [{ message: 'lien expiré ou invalide.' }] })
    }

    return response.status(200).send({ success: [{ message: 'lien valide.' }] })
  }

  async resetPassword({ request, response }: HttpContext) {
    const { email, password, token } = await request.validateUsing(resetPasswordValidator)
    const tokenInstance = await Token.findBy('token', token)

    if (
      !tokenInstance ||
      !!tokenInstance.isUsed ||
      tokenInstance.email !== email ||
      DateTime.now() > tokenInstance.expiriesAt
    ) {
      return response.status(200).send({ error: [{ message: 'lien expiré ou invalide.' }] })
    }

    const user = await User.findByOrFail('email', email)
    if (!user) {
      return response.status(404).send({ error: [{ message: 'Utilisateur introuvable.' }] })
    }

    await tokenInstance.merge({ isUsed: true }).save()
    await user.merge({ password }).save()

    return response
      .status(200)
      .send({ success: [{ message: 'Mot de passe réinitialisé avec succès.' }] })
  }
}
