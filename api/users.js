const express = require('express')
const bcrypt = require('bcryptjs')
const route = express.Router()
const db = require('../db')

module.exports = function (db, passport) {
  route.get('/login/auth/twitter', passport.authenticate('twitter'))
  route.post('/register', register)
  route.post('/login/auth/local', passport.authenticate('local', { failureRedirect: '/#/login' }), (req, res) => {
      console.log('api res', req.user);
      res.json({login: true, user: req.user})
    })
  route.get('/login/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/#/login' }), (req, res) => {
    console.log('here is what we are giving back', {login: true, user: req.user});
    res.redirect('/home')
  })

  function login (req, res, next) {
    const loginEntry = req.body
    db.findUserByEmail(loginEntry.email)
      .then(user => {
        if (!user) {
          res.json({login: false, error: 'Invalid Email/password'})
        }
        const { id, email, hash, userName } = user
        bcrypt.compare(loginEntry.password, hash, (err, response) => {
          if (response) {
            req.session.user = { id, email, userName }
            res.json({login: true, id: id})
          } else {
            res.json({login: false, error: 'Invalid email/Password'})
          }
        })
      })
  }

  function register (req, res, next) {
    const { userName, email, password } = req.body
    db.findUserByEmail(email)
      .then(user => {
        if (user) {
          res.json({register: false, err: 'Email already in use'})
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              db.addUser({ userName, email, hash })
                .then(user => {
                  const { id, email, userName } = user
                  req.session.user = { id, email, userName }
                  res.json({register: true, id: id})
                })
            })
          })
        }
      })
  }

  return route
}
