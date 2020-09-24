const db = require('../data/dbconfig')

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    removePost
}

function getAllPosts() {
    return db('posts')
}

function getPostById(id) {
    return db('posts')
        .where('id', id)
    }

function addPost(post) {
    return db("posts")
        .insert(post)
}

function updatePost(changes, id) {
    return db('posts')
        .update(changes)
        .where({ id })
}

function removePost(id){
    return db('posts')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}