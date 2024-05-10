import vine from '@vinejs/vine'
/**
 * Validates the compet's update action
 */
export const updateCompetValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value) => {
        const compet = await db.from('compets').where('name', value).first()
        return !compet
      })
      .optional(),
    number: vine
      .number()
      .positive()
      .unique(async (db, value) => {
        const compet = await db.from('compets').where('number', value).first()
        return !compet
      })
      .optional(),
  })
)
