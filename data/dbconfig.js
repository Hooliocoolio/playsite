const knex = require('knex')
const { development } = require('../knexfile')
require('dotenv').config();

const knexfile = require('../knexfile')
const environment = process.env.NODE_ENV || "development"

module.exports = knex(knexfile[environment])