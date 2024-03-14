import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('title')
      table.string('api').notNullable()
      table.string('description').notNullable()
      table.string('auth').notNullable()
      table.boolean('https').notNullable()
      table.string('cors').notNullable()
      table.string('link').notNullable()
      table.string('category').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
