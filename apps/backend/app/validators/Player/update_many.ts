import vine from '@vinejs/vine'

export const updateManyPlayerValidator = vine.compile(
  vine.object({
    players: vine.array(
      vine.object({
        id: vine.number(),
        goalsscored: vine.number().positive(),
        assists: vine.number(),
      })
    ),
  })
)
