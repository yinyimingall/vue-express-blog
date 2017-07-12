const express = require('express')
const sha1 = require('sha1')
const User = require('../service/user')
const createToken = require('../middleware/createToken')
let router = new express.Router()

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = sha1(req.body.password);
    User.findByName(username, (err, user) => {
        if (err) {
            res.send({
                code: -1,
                message: '查找数据库出错'
            })
            return console.log('error :' + err)
        }
        if (user && user.password === password) {
            res.send({
                code: 200,
                message: '登陆成功',
                token: createToken(username)
            })
        } else {
            res.send({
                code: 401,
                message: '用户名或密码不正确'
            })
        }
    })
})

module.exports = router;