import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Compet from './compet.js'

export default class EquipeHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare categoryLabel: string

  @column()
  declare type: string

  @column()
  declare pool: string

  @column()
  declare number: number

  @column()
  declare competId: number

  @column()
  declare classementHistoryId: number

  @belongsTo(() => Compet)
  declare compet: BelongsTo<typeof Compet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
