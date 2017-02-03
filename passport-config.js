const TwitterStrategy = require('passport-twitter').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = function (app, passport, db) {
  // used to serialize the user for the session
  // converts a user into a user-id
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  // converts an id into a user
  passport.deserializeUser((id, done) => {
    db.findBy('id', id)
      .then((user) => {
        done(null, user)
      })
  })

  // configure passport
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.findUserByEmail(email)
      .then(user => {
        if (!user) return done(null, false)
        const { id, email, hash, userName } = user
        bcrypt.compare(password, hash, (err, res) => {
          if(res){
            return done(null, { id, email, userName })
          }else{
            return done(null, false)
          }
        })
    })
  }
))
  passport.use('twitter', new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
    function (token, tokenSecret, profile, done) {
      // db.findOrCreate  won't fire until we have all our data back from Twitter
      process.nextTick(() => {
        db.findOrCreate('twitterId', profile.id, profile)
          .then((user) => {
            return done(null, user)
          })
          .catch(done)
      })
    }
  ))
}
