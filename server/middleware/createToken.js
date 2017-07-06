const jwt = require('jsonwebtoken')

module.exports = (username) => {
    return jwt.sign({
        data: username
    }, 'secret', { expiresIn: '1h'})
}