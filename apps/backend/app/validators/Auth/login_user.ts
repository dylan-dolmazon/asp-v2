import vine from '@vinejs/vine'

/**
 * Validates the user's login action
 */
export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
  })
)
