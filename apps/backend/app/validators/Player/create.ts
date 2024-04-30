import vine from '@vinejs/vine'
/**
 * Validates the player's create action
 */
export const createPlayerValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim(),
    lastname: vine.string().trim(),
    age: vine.number().positive(),
    position: vine.string().trim(),
    nationality: vine.string().trim(),
    height: vine.number().positive().optional(),
    weight: vine.number().positive().optional(),
    footed: vine.string().trim(),
    goalsscored: vine.number().positive(),
    assists: vine.number(),
    yellowcards: vine.number().positive(),
    redcards: vine.number().positive(),
    pace: vine.number().withoutDecimals().positive(),
    shooting: vine.number().withoutDecimals().positive(),
    passing: vine.number().withoutDecimals().positive(),
    dribbling: vine.number().withoutDecimals().positive(),
    defending: vine.number().withoutDecimals().positive(),
    physical: vine.number().withoutDecimals().positive(),
  })
)
