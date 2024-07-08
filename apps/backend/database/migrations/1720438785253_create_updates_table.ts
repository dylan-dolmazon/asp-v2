import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'compets'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('classement_history_id')
        .unsigned()
        .references('id')
        .inTable('classement_histories')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
