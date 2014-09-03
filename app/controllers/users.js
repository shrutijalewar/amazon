'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.profileEdit = function(req, res){
  res.render('users/profileEdit');
};

exports.profile = function(req, res){
  res.render('users/profile');
};

exports.update = function(req, res){
  req.user.update(req.body, function(){
    res.redirect('/profile');
  });
};

exports.logout = function(req, res){
  req.logout();
  req.flash('notice', 'You have logged out of the system');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};


