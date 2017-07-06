const express = require('express')
const User = require('../service/user')

let router = new express.Router()

router.post('/commit', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
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
                message: '登陆成功'
            })
        } else {
            res.send({
                code: 001,
                message: '用户名或密码不正确'
            })
        }
    })
})

module.exports = router;