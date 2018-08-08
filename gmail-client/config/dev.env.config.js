// rename file dev.env.js

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
 NODE_ENV: '"development"',
 CLIENT_ID: '"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com"',
 BASE_URL: '"http://localhost:8081/"', //or whatever host npm run dev gives you
 REDIRECT_URI: '"http://localhost:8081/"',
 API_KEY: '"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"'
})