/**
 * Created by ASUS on 2017/7/17 0017.
 */
var http = require('http');
var queryString = require('querystring');
var util = require('util');
var url = require('url');
var appConfig = require('../../common/config').app;
var ShitResource = require('../util/ShitResource');

/**
 * 应用启动类
 * @constructor
 */
function ShitApp() {

    /**
     * 启动应用
     */
    this.start = function() {
        http.createServer(function (req, res) {
            var body = "";
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                // 解析参数
                body = queryString.parse(body);
                var params = url.parse(req.url, true).query;
                try {
                    if (req.url === '/favicon.ico') {
                        // 如果是node自动发起的/favicon.ico请求
                    } else if (req.url.indexOf('/static') === 0) {
                        // 如果是获取静态资源
                        res.writeHead(200, {'Content-Type': req.headers.accept.split(',')[0] + '; charset=utf8'});
                        // 静态信息处理
                        ShitResource.static(res, req.url);
                    } else {
                        // 如果都不是就映射controller
                        // 设置响应头部信息及编码
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                        // 执行映射
                        doAction(params['controller'], params['action'], params, body, res);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }).listen(appConfig.port);
    }

    /**
     * 映射请求处理
     * @param controllerName 控制器名称
     * @param actionName 操作名称
     * @param params get参数
     * @param body post参数
     * @param res 请求响应
     */
    function doAction(controllerName, actionName, params, body, res) {
        // 根据是否传入指定参数获取（如果没有传入参数则指定为默认值)
        controllerName = controllerName || appConfig.defaultController;
        actionName = actionName || appConfig.defaultAction;
        // 将请求的信息存为全局变量
        ShitApp.CONTROLLER = controllerName;
        ShitApp.ACTION = actionName;
        // 初始化controller并执行操作
        var controller = ShitApp.controller(controllerName);
        // 初始化
        controller.init();
        controller[actionName](params, body, res);
    }
}

/**
 * 静态变量，项目module文件和ShitApp的相对路径
 * @type {string}
 */
ShitApp.modulePath = '../../../www/modules';

/**
 * 根据名字初始化model类
 * @param modelName 类名字（小写首字母）
 */
ShitApp.model = function (modelName) {
    // 拼接model类的完整名字
    modelName = modelName.substr(0, 1).toUpperCase() + modelName.substr(1);
    // 拼接完整路径并获取modelClass
    var modelClass = require(ShitApp.modulePath + '/model/' + modelName);
    if (typeof modelClass !== 'function') {
        // 兼容以exports.xxx=xxx的model导出形式
        modelClass = modelClass[modelName];
    }
    return new modelClass();
}

/**
 * 根据名字初始化Controller类
 * @param controllerName 类名字（小写首字母）
 */
ShitApp.controller = function(controllerName) {
    controllerName = controllerName.substr(0, 1).toUpperCase() + controllerName.substr(1) + "Controller";
    var controllerClass = require(ShitApp.modulePath + '/controller/' + controllerName);
    if(typeof controllerClass !== 'function') {
        controllerClass = controllerClass[controllerName];
    }
    return new controllerClass();
}

module.exports = ShitApp;