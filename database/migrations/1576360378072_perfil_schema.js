'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerfilSchema extends Schema {
  up () {
    this.create('perfils', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('nome').notNullable()
      table.string('base').notNullable()
      table.integer('tempo_de_skate').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('perfils')
  }
}

module.exports = PerfilSchema
