import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
import { getPosition } from '../utils/functions/get_position.js'
import { getFooted } from '../utils/functions/get_footed.js'

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
  declare pace: number

  @column()
  declare shooting: number

  @column()
  declare passing: number

  @column()
  declare dribbling: number

  @column()
  declare defending: number

  @column()
  declare physical: number

  @computed()
  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  @computed()
  get positionLabel() {
    return getPosition(this.position)
  }

  @computed()
  get footedLabel() {
    return getFooted(this.footed)
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
