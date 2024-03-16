import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare age: number

  @column()
  declare position: string

  @column()
  declare nationality: string

  @column()
  declare height: number | undefined

  @column()
  declare weight: number | undefined

  @column()
  declare footed: string

  @column()
  declare goalsscored: number

  @column()
  declare assists: number

  @column()
  declare yellowcards: number

  @column()
  declare redcards: number

  @column()
  declare pace: number | undefined

  @column()
  declare shooting: number | undefined

  @column()
  declare passing: number | undefined

  @column()
  declare dribbling: number | undefined

  @column()
  declare defending: number | undefined

  @column()
  declare physical: number | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
