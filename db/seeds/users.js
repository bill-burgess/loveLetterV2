
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, userName: 'Bill', email: 'wmhburgess@gmail.com', hash: '$2a$10$jitPg0PvMQenjp9O0uYNV.v./KJs7rt9Sx1XFxKywh6T6wvxH5M2S'}),
        knex('users').insert({id: 2, userName: 'Jimmy', email: 'jimmyjones@gmail.com', hash: '$2a$10$Idlm2.8z7JD29six0j3HY.Vg3.AO/35b/Y918xFWhi/uf5uiWWif2'})
      ])
    })
}
