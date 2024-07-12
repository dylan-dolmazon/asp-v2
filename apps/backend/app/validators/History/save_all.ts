import vine from '@vinejs/vine'
/**
 * Validates the History's save_all action
 */
export const HistorySaveAll = vine.compile(
  vine.object({
    competsId: vine.array(vine.number().positive().withoutDecimals().min(99999)),
  })
)
