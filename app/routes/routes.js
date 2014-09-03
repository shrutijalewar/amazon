'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);

  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', successFlash: 'Thanks for joining us!', failureFlash: 'Sorry your login Info was incorrect'}));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash: 'Twitter is logged in!', failureFlash: 'Sorry your twitter login didnt work'}));
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {successRedirect:'/', failureRedirect:'/login', successFlash: 'Github is logged in!', failureFlash: 'Sorry your github login didnt work'}));
  app.get('/auth/google', passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', passport.authenticate('google', {successRedirect:'/', failureRedirect:'/login', successFlash: 'Google is logged in!', failureFlash: 'Sorry your google login didnt work'}));
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login', successFlash: 'facebook is logged in!', failureFlash: 'Sorry your facebook login didnt work'}));
  app.get('/auth/linkedin', passport.authenticate('linkedin', {state: 'SOME STATE'}));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {successRedirect:'/', failureRedirect:'/login', successFlash: 'linkedin is logged in!', failureFlash: 'Sorry your linkedin login didnt work'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/profile', users.profile);
  app.get('/profile/edit', users.profileEdit);
  app.post('/profile', users.update);

  console.log('Express: Routes Loaded');
};

