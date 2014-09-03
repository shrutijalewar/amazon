'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
      _    = require('underscore-contrib');

function User(o){
  this.email = o.email;
  this.photo = o.photo;
  this.age = parseInt(o.age);
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.type = 'local';
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null , user);
  });
};

User.twitterAuthenticate = function(token, twitter, secret, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user= {twitterId:twitter.id, username:twitter.username, displayNmae: twitter.displayName, type: 'twitter'};
    User.collection.save(user, cb);
  });
  console.log('token', token);
  console.log('twitter', twitter);
  console.log('secret', secret);
  console.log('cb', cb);
};
User.githubAuthenticate = function(token, secret, github, cb){
  console.log(github);
  User.collection.findOne({githubId:github.id}, function(err, user){
    if(user){return cb(null, user);}
    user= {githubId:github.id, username:github.username, displayNmae:github.username, type: 'github'};
    User.collection.save(user, cb);
  });
};
User.googleAuthenticate = function(token, secret, google, cb){
  console.log(google);
  console.log(secret);
  console.log(token);
  console.log(cb);
  User.collection.findOne({googleId:google.id}, function(err, user){
    if(user){return cb(null, user);}
    user= {googleId:google.id, displayNmae:google.displayName, type: 'google'};
    User.collection.save(user, cb);
  });
};
User.facebookAuthenticate = function(token, secret, facebook, cb){
  console.log(facebook);
  User.collection.findOne({facebookId:facebook.id}, function(err, user){
    if(user){return cb(null, user);}
    user= {facebookId:facebook.id, username:facebook.username, displayNmae:facebook.username, type: 'facebook'};
    User.collection.save(user, cb);
  });
};
User.linkedinAuthenticate = function(token, secret, linkedin, cb){
  console.log('>>>>>>>>>>>>',linkedin, token, secret, cb);
  User.collection.findOne({linkedinId:linkedin.id}, function(err, user){
    if(user){return cb(null, user);}
    user= {linkedinId:linkedin.id, username:linkedin.username, displayNmae:linkedin.username, type: 'linkedin'};
    User.collection.save(user, cb);
  });
};

User.prototype.update = function(o, cb){
  this.email = o.email;
  this.age   = o.age * 1;
  this.photo = o.photo;

  User.collection.save(this, cb);
};
module.exports = User;

