module.exports = function (knex) {
  return {
    find: function (table, options) {
      return knex(table).select()
    },

    findById: function (table, id) {
      return knex(table).select().then((rows) => rows[0])
    }
  }
}
