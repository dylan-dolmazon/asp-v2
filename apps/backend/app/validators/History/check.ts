import vine from '@vinejs/vine'
/**
 * Validates the History's check all action
 */
export const HistoryCheckAll = vine.compile(
  vine.object({
    competsId: vine.array(vine.number().positive().withoutDecimals().min(99999)),
    season: vine.string(),
  })
)
