module.exports = function (app, passport) {
    // route for home page
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

//    // route for showing the profile page
  app.get('/user-data', isLoggedIn, (req, res) => {
    res.send(req.user)
  })

   // route for logging out
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

   // route for twitter authentication and login
    // app.get('login/auth/twitter', passport.authenticate('twitter'))

    // handle the callback after twitter has authenticated the user
  app.get(
      'login/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect: '/user-data',
        failureRedirect: '/login'
      })
    )
}

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next()
  }

  // if they aren't respond with message
  res.json({loggedIn: false})
}
