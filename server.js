require("dotenv/config")
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const apiRouter = require('./api-router')
const cookieParser = require('cookie-parser')

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api', apiRouter)

server.get('/api', (req, res) => {
    res.json('Api is working')
})

module.exports = server;
