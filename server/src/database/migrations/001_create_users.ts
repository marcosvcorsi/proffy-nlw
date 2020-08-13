import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('lastname').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('avatar').nullable();
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
