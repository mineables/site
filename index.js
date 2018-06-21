const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

const dist = path.resolve(__dirname, '/dist')

// create the express app
const app = express()
app.use(history({ verbose: true }))
// create middleware to handle the serving the app
app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.all('*', function (req, res) {
  res.sendFile('index.html', {root: dist})
})

// Create default port to serve the app on
const port = process.env.PORT || 5000
app.listen(port)
// Log a feedback that this is actually running
console.log('Server started on port ' + port)
