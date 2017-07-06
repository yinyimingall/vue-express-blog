const express = require('express')
const User = require('../service/user')

let router = express.Router();

router.post('/commit', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = {
        username,
        password
    }
    User.create(user, (err, user) => {
        if (err) {
            if (err.code === 11000) {
                res.send({
                    code: 100,
                    message: '用户名已经存在'
                })
            }
            return console.log('save error:' + err);
        }
        console.log('save success' + user)
        res.send({
            code: 200,
            message: '注册成功'
        })
    })
})

router.get('/checkname', (req, res, next) => {
    let username = req.query.username;
    console.log(username)
    User.findByName(username, (err, user) => {
        if (err) {
            res.send({
                code: '514',
                message: '数据库查询失败'
            })
            return console.log('save error:' + err);
        }
        if(user && user.username === username) {
            res.send({
                code: 105,
                message: '用户名已经存在'
            })
            return;
        }
        if(!user) {
            res.send({
                code: '200',
                message: '用户名可用'
            })
        }
    })
})

module.exports = router;