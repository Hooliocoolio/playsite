const router = require('express').Router();

/*  hacks router  */
const hr = require('./routes/hacks-routes')

/*  users router  */
const ur = require('./routes/user-routes')

router.use('/hacks', hr)
 

router.use('/users', ur)
 
 

module.exports = router;