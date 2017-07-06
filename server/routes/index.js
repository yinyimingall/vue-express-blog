module.exports = function(app) {
    app.use('/api1.0/signup', require('./signup'))
    app.use('/api1.0/signin', require('./signin'))
}