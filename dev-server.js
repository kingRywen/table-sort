const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const port = 4000

const app = express()
const config = require('./webpack.dev.js')
const compiler = webpack(config)

const devMiddleware = webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

app.use(devMiddleware)

app.use(webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}))

let uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})


app.listen(port)

