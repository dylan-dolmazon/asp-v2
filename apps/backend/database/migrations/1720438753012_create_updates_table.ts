import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classement_histories'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('equipe_histories_id')
        .unsigned()
        .references('id')
        .inTable('equipe_histories')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
