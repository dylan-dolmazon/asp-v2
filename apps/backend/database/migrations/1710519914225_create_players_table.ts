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
      table.string('nationality').notNullable()
      table.integer('height').nullable()
      table.integer('weight').nullable()
      table.string('footed').notNullable()
      table.integer('goalsscored').defaultTo(0)
      table.integer('assists').defaultTo(0)
      table.integer('yellowcards').defaultTo(0)
      table.integer('redcards').defaultTo(0)
      table.integer('pace').nullable()
      table.integer('shooting').nullable()
      table.integer('passing').nullable()
      table.integer('dribbling').nullable()
      table.integer('defending').nullable()
      table.integer('physical').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
