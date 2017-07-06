const mongoose = require('mongoose')
// 当 app 只使用一个数据库时使用
mongoose.connect('mongodb://localhost/blogDB', {
    userMongoClient: true
})
// 当使用不止一个数据时使用
// let db = mongoose.createConnection('localhost', 'blogDB')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("数据库连接成功");
});

module.exports = db;