import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'equipe_historys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('category_label').notNullable()
      table.string('type').notNullable()
      table.string('pool').notNullable()
      table.integer('number').notNullable()
      table.integer('compet_id').unsigned().references('id').inTable('compets').onDelete('CASCADE')

      // table
      //   .integer('classement_history_id')
      //   .unsigned()
      //   .references('id')
      //   .inTable('classement_histories')
      //   .onDelete('CASCADE')
      // table.integer('compets_id').unsigned().references('id').inTable('compets').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
