const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.headers)
    if(req.headers) {

    }
    next();
}