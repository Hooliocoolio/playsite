const db = require('../data/dbconfig')

//-----------------------------------------------------------------------------
/*  function pulls all posts from database  */
//-----------------------------------------------------------------------------
function getAllPosts() {
    return db('posts')
}

//-----------------------------------------------------------------------------
/*  Function gets Post post by post id  */
//-----------------------------------------------------------------------------
function getPostById(id) {
    return db('posts')
        .where('id', id)
}

//-----------------------------------------------------------------------------
/*  Function adds a Post post  */
//-----------------------------------------------------------------------------
function addPost(post) {
    return db("posts")
        .insert(post)
}

//-----------------------------------------------------------------------------
/*  Updates Post post  */
//-----------------------------------------------------------------------------
function updatePost(changes, id) {
    return db('posts')
        .update(changes)
        .where({ id })
}

//-----------------------------------------------------------------------------
/*  Removes Post post from database  */
//-----------------------------------------------------------------------------
function removePost(id){
    return db('posts')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}

//-----------------------------------------------------------------------------
/*  Exporting All Modules  */
//-----------------------------------------------------------------------------
module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    removePost
}