import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classement_historys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('saison').notNullable()
      table.integer('total_matchs').notNullable()
      table.integer('points').notNullable()
      table.integer('goal_for').notNullable()
      table.integer('goal_against').notNullable()
      table.integer('rank').notNullable()
      table.integer('win').notNullable()
      table.integer('draw').notNullable()
      table.integer('loss').notNullable()
      table.integer('forfeit').notNullable()
      table.integer('penality').notNullable()
      table.string('pool').notNullable()

      table
        .integer('equipe_history_id')
        .unsigned()
        .references('id')
        .inTable('equipe_historys')
        .onDelete('CASCADE')
      table.integer('compet_id').unsigned().references('id').inTable('compets').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
