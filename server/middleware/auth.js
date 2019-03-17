const models = require('../models');
const Promise = require('bluebird');
var request = require('request');

module.exports.createSession = (req, res, next) => {
    if (req.cookies === undefined) {
        req.cookies = {};
    }
    if (typeof req.cookies === 'object') {
        if (Object.keys(req.cookies).length === 0) {
            return models.Sessions.create()
            .then((result) => {
                return models.Sessions.get({id: result.insertId})
            })
            .then((results) => {
                return req.session = results;
            })
            .then(() => {
                return res.cookie ('shortlyid', req.session.hash);
            })
            .then(() => {
                next();
            })
            .catch(() => {
                console.log('Oops!');
            })
        } else {
            return models.Sessions.get({hash: req.cookies.shortlyid})
            .then((results) => {
                if (results === undefined) {
                    throw ('oops');
                }
                req.session = results;
            })
            .then(() => {
                next();
            })
            .catch(() => {
                return models.Sessions.create()
                .then((result) => {
                    return models.Sessions.get({id: result.insertId})
                })
                .then((results) => {
                    return req.session = results;
                })
                .then(() => {
                    return res.cookie ('shortlyid', req.session.hash);
                })
                .then(() => {
                    next();
                })
                .catch(() => {
                    console.log('Oops!');
                })
            })
            
        }
    }

    next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

