import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.integer('age').notNullable()
      table.string('position').notNullable()
      table.string('nationality').notNullable().defaultTo('FR')
      table.integer('height').nullable()
      table.integer('weight').nullable()
      table.string('footed').notNullable()
      table.integer('goalsscored').defaultTo(0)
      table.integer('assists').defaultTo(0)
      table.integer('yellowcards').defaultTo(0)
      table.integer('redcards').defaultTo(0)
      table.integer('pace').notNullable()
      table.integer('shooting').notNullable()
      table.integer('passing').notNullable()
      table.integer('dribbling').notNullable()
      table.integer('defending').notNullable()
      table.integer('physical').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
