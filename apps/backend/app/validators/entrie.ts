import vine from '@vinejs/vine'

/**
 * Validates the entrie's creation action
 */
export const createEntrieValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    api: vine.string().trim(),
    description: vine.string().trim(),
    auth: vine.string().trim(),
    https: vine.boolean(),
    cors: vine.string().trim(),
    link: vine.string().trim(),
    category: vine.string().trim(),
  })
)

/**
 * Validates the entrie's update action
 */
export const updateEntrieValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).optional(),
    api: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    auth: vine.string().trim().optional(),
    https: vine.boolean().optional(),
    cors: vine.string().trim().optional(),
    link: vine.string().trim().optional(),
    category: vine.string().trim().optional(),
  })
)
