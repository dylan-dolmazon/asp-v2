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
    goalsscored: vine.number().positive().optional(),
    assists: vine.number().optional(),
    yellowcards: vine.number().positive().optional(),
    redcards: vine.number().positive().optional(),
    pace: vine.number().positive().optional(),
    shooting: vine.number().positive().optional(),
    passing: vine.number().positive().optional(),
    dribbling: vine.number().positive().optional(),
    defending: vine.number().positive().optional(),
    physical: vine.number().positive().optional(),
  })
)
