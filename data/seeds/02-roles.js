
exports.seed = function(knex) {
  // Deletes ALL existing entries
 
    
      // Inserts seed entries
 knex('roles').insert([
        {id: 1, name: 'basic'},
        {id: 2, name: 'admin'},
        {id: 3, name: 'superadmin'}
      ]);
};
