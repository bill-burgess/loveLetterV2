const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const passportInfo = require('session-passport-info')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const morgan = require('morgan')
const api = require('./api')

const passportConfig = require('./passport-config')
const routes = require('./routes')

module.exports = function (db) {
  const app = express()

  app.use(morgan('dev'))
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(logger('dev'))
  app.use(cookieParser('sercret'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  passportConfig(app, passport, db)

  if (app.get('env') === 'development') {
    // bundle client/index.js
    // and serve it at GET /bundle.js
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.config')
    const webpack = require('webpack')
    const compiler = webpack(config)
    const livereload = require('livereload')
    const lrserver = livereload.createServer()

    lrserver.watch([
      __dirname + '/public',
      __dirname + '/src'
    ])

    app.use(require('inject-lr-script')())

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }))
  }

  // static files
  app.use('/', express.static(path.join(__dirname, 'public')))

  // routes
  app.use('/api/v1/', api.users(db, passport))

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.json({
        message: err.message,
        error: err
      })
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: {}
    })
  })

  return app
}
