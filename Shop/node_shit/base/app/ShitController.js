/**
 * Created by ASUS on 2017/7/17 0017.
 */
// 工具
var util = require('util');
// 配置信息
var config = require("../../common/config");
// ShitApp
var ShitApp = require("../../../node_shit/base/app/ShitApp");
// 模板引擎类
var ShitTemplate = require('../util/ShitTemplate');
// 模板引擎
var shitTemplate;

/**
 * controller层的基类
 * @constructor
 */
function ShitController() {

}

/**
 * 供继承的内容
 * @type {{}}
 */
ShitController.prototype = {
    /**
     * 初始化
     */
    init : function() {
        shitTemplate = new ShitTemplate(config.app.templatesPath, config.app.templatesCharset, config.app.templatesSymbol);
    },

    /**
     * 显示界面
     * @param res 响应对象
     */
    display : function(res) {
        // 获取模板内容
        var data = shitTemplate.readTemplate(ShitApp.CONTROLLER + "/" + ShitApp.ACTION + ".html");
        res.write(data);
        res.end();
    },

    /**
     * 输入模板占位符替代对象
     * @param name 键
     * @param value 值
     */
    design : function (name, value) {
        shitTemplate.design(name, value);
    },

    /**
     * 响应json形式请求信息
     * @param res 响应
     * @param json 信息对象
     */
    print : function(res, json) {
        res.write(JSON.stringify(json));
        res.end();
    },

    /**
     * 返回请求成功信息
     * @param res 响应
     * @param json 成功信息存储对象
     */
    success : function(res, json) {
        this.print(res, {result: 'success', message : json})
    },

    /**
     * 返回请求失败信息
     * @param res 响应
     * @param json 失败信息存储对象
     */
    error : function(res, json) {
        this.print(res, {result: 'error', message : json})
    },

    /**
     * 封装ShitApp中的model方法方便子类调用
     * @param modelName model名
     * @returns {*}
     */
    model : function(modelName) {
        return ShitApp.model(modelName);
    }
}

// ShitController
exports.inheritsShitController  = function(Class) {
    util.inherits(Class, ShitController);
}