const db = require('../data/dbconfig')

module.exports = {
    getAllHacks,
    getHackById,
    addHack,
    updateHack,
    removeHack
}

function getAllHacks() {
    return db('hacks')
}

function getHackById(id) {
    return db('hacks')
        .where('id', id)
    }

function addHack(hack) {
    return db("hacks")
        .insert(hack)
}

function updateHack(changes, id) {
    return db('hacks')
        .update(changes)
        .where({ id })
}

function removeHack(id){
    return db('hacks')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}