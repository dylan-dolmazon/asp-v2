import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const storeUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    firstName: vine.string().trim().minLength(3).alphaNumeric(),
    lastName: vine.string().trim().minLength(3).alphaNumeric(),
    password: vine.string().minLength(6),
  })
)
