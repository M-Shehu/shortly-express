const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
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
                return res.cookies = {'shortlyid' : {'value': req.session.hash}};
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
                .then((result) => {
                    console.log(result);
                    return res.cookies = {'shortlyid' : result.hash};
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

