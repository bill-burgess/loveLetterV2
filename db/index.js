const _ = require('lodash')
const uuid = require('uuid/v4')

module.exports = function (knex) {
  const users = []
  return {

    findUserByEmail: function (email) {
      return knex('users')
        .where({email: email})
        .then(users => users[0])
    },

    addUser: function (user) {
      return knex('users')
        .insert(user)
        .then(ids => {
          return knex('users')
            .where({id: ids[0]})
            .then(users => users[0])
        })
    },

    findBy: function (key, value) {
      const user = _.find(users, { [key]: value })

      // fake promise
      return Promise.resolve(user)
    },

    addUser: function (data) {
      const user = { id: uuid(), twitterId: data.id, data: data }

      users.push(user)
      return Promise.resolve(user)
    },

    findOrCreate: function (key, value, data) {
      return this.findBy(key, value)
        .then((user) => {
          if (user) {
            return user
          } else {
            return this.addUser(data)
          }
        })
    }

  }
}
