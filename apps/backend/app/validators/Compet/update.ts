import vine from '@vinejs/vine'
/**
 * Validates the compet's update action
 */
export const updateCompetValidator = vine.compile(
  vine.object({
    number: vine
      .number()
      .positive()
      .withoutDecimals()
      .min(99999)
      .unique(async (db, value) => {
        const compet = await db.from('compets').where('number', value).first()
        return !compet
      }),
  })
)
