import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'compets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable().unique()
      table.integer('number').notNullable().unique()
      table.integer('order').notNullable().unique()
      table.string('short_name').notNullable().unique()
      table.string('season').notNullable()
      table
        .integer('district_id')
        .unsigned()
        .references('id')
        .inTable('districts')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
