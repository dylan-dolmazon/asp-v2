import vine from '@vinejs/vine'

/**
 * Validates checking link action
 */
export const checkLinkValidator = vine.compile(
  vine.object({
    token: vine.string().trim(),
    email: vine.string().trim().email(),
  })
)
