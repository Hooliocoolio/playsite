
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const ar = require('./ar')
const cookieParser = require('cookie-parser')

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api', ar)

server.get('/', (req, res) => {
    res.json('Api is working')
})

module.exports = server;
