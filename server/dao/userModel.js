const mongoose = require('mongoose')
const db = require('./connect')
// 用户的描述概要 Schema
let UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    versionKey: false // 版本 Key 不插入数据库
})
// 定义一个 model 的静态方法，可以通过 UserModel.findByName()调用
UserSchema.statics.findByName = function(username, cb) {
    return this.findOne({ username: username }, cb)
}
// 使用 creatConnection 时，要用 db.model(); 使用 mongoose.connect() 时使用 mongoose.model();
let UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel;