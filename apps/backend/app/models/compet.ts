import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import District from './district.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Compet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare season: string

  @column()
  declare name: string

  @column()
  declare number: number

  @column()
  declare order: number

  @column()
  declare shortName: string

  @column()
  declare districtId: number

  @belongsTo(() => District)
  declare district: BelongsTo<typeof District>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
