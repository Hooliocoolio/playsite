const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const apiRouter = require('./api-router')

const server = express()
server.use(helmet())
server.use(expres.json())
server.use(cors())

server.use('/api', apiRouter)

server.get('/', (req, res) => {
    res.json('Api is working')
})

module.exports = server;
