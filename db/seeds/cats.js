// adjust seedData as needed

// const seedCats = require('../seed-cats')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      // return knex('cats').insert(seedCats)
    })
}
