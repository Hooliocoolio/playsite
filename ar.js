const sr = require('express').Router();

/*  posts router  */
const pr= require('./routes/pr')

/*  users router  */
const ur = require('./routes/ur')

sr.use('/posts', pr)
 

sr.use('/users', ur)
 
 

module.exports = sr;