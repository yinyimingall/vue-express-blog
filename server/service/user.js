const UserModel = require('../dao/userModel')

const User = {
    // 创建用户
    create: (userParam, cb) => {
        return new UserModel(userParam).save(cb)
    },
    // 通过名字获取用户
    findByName: (username, cb) => {
        return UserModel.findByName(username, cb)
    }
}
module.exports = User;