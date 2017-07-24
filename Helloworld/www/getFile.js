/**
 * Created by ASUS on 2017/7/18 0018.
 */
var http = require('http');
var url = require('url');
var util = require('util');
var fs = require("fs");



http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    var data = fs.readFileSync('./www/test.html','utf-8');
    console.log(data);
    res.end(data);

}).listen(8000);