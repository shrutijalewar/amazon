'use strict';

var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy,
    User = require('../../models/user'),
    config = require('../../../../../../config'),
    linkedin = new LinkedinStrategy(
        {
          clientID:  config.linkedIn.clientId,
          clientSecret:  config.linkedIn.clientSecret,
          callbackURL: config.linkedIn.callbackURL
        },
            User.linkedinAuthenticate);

module.exports = linkedin;
