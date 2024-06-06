import vine from '@vinejs/vine'

/**
 * Validates the reset password action
 */
export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6).confirmed(),
    token: vine.string().trim(),
  })
)
