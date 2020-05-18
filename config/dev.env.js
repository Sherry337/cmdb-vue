'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://127.0.0.1:8000"',
  BASE_API: '"http://10.9.38.58:8800/api/v1/"',
})