
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'useone', password:'mypassword', email:'userone@email.com'},
        {id: 2, username: 'usertwo', password:'mypassword', email:'usertwo@email.com'},
        {id: 3, username: 'userthree', password:'mypassword', email:'userthree@email.com'}
      ]);
    });
};
