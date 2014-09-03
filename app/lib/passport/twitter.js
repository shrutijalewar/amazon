'use strict';

var TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../../models/user'),
    config = require('../../../../../../config'),
    twitter = new TwitterStrategy(
        {
          consumerKey:  config.twitter.apiKey,
          consumerSecret:  config.twitter.apiSecret,
          callbackURL: config.twitter.callbackURL
        },
            User.twitterAuthenticate);

module.exports = twitter;
