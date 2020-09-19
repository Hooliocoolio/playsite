const db = require('../data/dbconfig')


function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first()
}


async function addUser(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function allUsers() {
    return db('users')
      
}

function findUser(filter) {
    return db('users')
        .select('id', 'username', 'password', 'role')
        .where(filter)
} 



module.exports = {
    findById,
    addUser,
    allUsers,
    findUser
}