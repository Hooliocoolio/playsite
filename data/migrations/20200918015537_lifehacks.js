
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id')
            tbl.string('username', 128)
                .notNullable()
                .unique()
                .index()
            tbl.string('password', 256)
                .notNullable()
            tbl.string('email', 256)
                .notNullable()
        })
        .createTable('hacks', tbl => {
            tbl.increments('id')
            tbl.string('title')
                .notNullable()
            tbl.string('post')
                .notNullable()
            tbl.timestamp('created_at', {useTz: true})
                .defaultTo(knex.fn.now())
            tbl.integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('SET NULL')
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('hacks')
        .dropTableIfExists('users')
  
};