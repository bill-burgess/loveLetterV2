module.exports = function (knex) {
  return {

    findUserByEmail: function(email){
      return knex('users')
        .where({email: email})
        .then(users => users[0])
    },

    addUser: function(user){
      return knex('users')
        .insert(user)
        .then(ids => {
          return knex('users')
            .where({id: ids[0]})
            .then(users => users[0])
        })
    }
  }
}
