var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var routes = require('./routes')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//预检请求使用
    next();
})
//加载所有路由
routes(app);

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function() {
  console.log('Blog server with Express listening on port ' + app.get('port'));
})