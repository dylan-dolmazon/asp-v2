import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Compet from './compet.js'
import EquipeHistory from './equipe_history.js'

export default class ClassementHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare saison: string

  @column()
  declare totalMatchs: number

  @column()
  declare points: number

  @column()
  declare goalFor: number

  @column()
  declare goalAgainst: number

  @column()
  declare rank: number

  @column()
  declare win: number

  @column()
  declare draw: number

  @column()
  declare loss: number

  @column()
  declare forfeit: number

  @column()
  declare penality: number

  @column()
  declare pool: string

  @column()
  declare equipeHistoryId: number

  @column()
  declare competId: number

  @belongsTo(() => EquipeHistory)
  declare equipeHistory: BelongsTo<typeof EquipeHistory>

  @belongsTo(() => Compet)
  declare compet: BelongsTo<typeof Compet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
