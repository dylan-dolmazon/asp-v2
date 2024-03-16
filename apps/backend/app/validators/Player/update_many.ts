import vine from '@vinejs/vine'

export const updateManyPlayerValidator = vine.compile(
  vine.object({
    players: vine.array(
      vine.object({
        id: vine.number(),
        firstname: vine.string().trim().optional(),
        lastname: vine.string().trim().optional(),
        age: vine.number().positive().optional(),
        position: vine.string().trim().optional(),
        nationality: vine.string().trim().optional(),
        height: vine.number().positive().optional(),
        weight: vine.number().positive().optional(),
        footed: vine.string().trim().optional(),
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
    ),
  })
)
