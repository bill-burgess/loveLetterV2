exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments()
    t.string('userName')
    t.string('email')
    t.string('hash')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
