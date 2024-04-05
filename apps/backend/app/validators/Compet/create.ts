import vine from '@vinejs/vine'
/**
 * Validates the compet's create action
 */
export const createCompetValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value) => {
        const compet = await db.from('compets').where('name', value).first()
        return !compet
      }),
    number: vine
      .number()
      .positive()
      .unique(async (db, value) => {
        const compet = await db.from('compets').where('number', value).first()
        return !compet
      }),
  })
)
