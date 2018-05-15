// server.js
var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var port = process.env.PORT || 5000

var app = express()
app.use(serveStatic(path.join(__dirname, '/dist')))
app.listen(port)

console.log('server started ' + port)