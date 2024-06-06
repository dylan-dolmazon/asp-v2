import vine from '@vinejs/vine'
import env from '#start/env'

/**
 * Validates user update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).optional(),
    email: vine.string().email().optional(),
    firstname: vine.string().trim().minLength(3).alphaNumeric().optional(),
    lastname: vine.string().trim().minLength(3).alphaNumeric().optional(),
    password: vine.string().minLength(6),
  })
)

/**
 * Validates user update to admin action
 */
export const updateUserToAdminValidator = vine.compile(
  vine.object({
    users: vine.array(
      vine.object({
        username: vine.string().trim().minLength(3),
        role: vine.string().in(['user', 'admin', 'moderator']),
      })
    ),
    key: vine.string().in([env.get('ADMIN_SECRET_KEY')]),
  })
)
