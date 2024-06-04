import vine from '@vinejs/vine'

/**
 * Validates the forgot password action
 */
export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)
