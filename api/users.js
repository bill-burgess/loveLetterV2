const express = require('express')
const bcrypt = require('bcryptjs')
const route = express.Router()
const db = require('../db')

module.exports = function (db) {
  route.post('/login', login)
  route.post('/register', register)

  function login (req, res, next) {
    const loginEntry = req.body
    db.findUserByEmail(loginEntry.email)
      .then(user => {
        if(!user){
          res.json({login: false, error: 'Invalid Email/password'})
        }
        const { id, email, hash, userName } = user
        console.log('loginEntry.password', loginEntry.password)
        bcrypt.compare(loginEntry.password, hash, (err, response) => {
          if (response){
            req.session.user = { id, email, userName }
            res.json({login: true, id: id})
          }else{
            res.json({login: false, error: 'Invalid email/Password'})
          }
        })
      })
  }

  function register (req, res, next) {
    const { userName, email, password } = req.body
    db.findUserByEmail(email)
      .then(user => {
        if(user){
          res.json({register: false, err: 'Email already in use'})
        }else{
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
