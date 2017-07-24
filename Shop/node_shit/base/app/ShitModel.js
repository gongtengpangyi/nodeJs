/**
 * Created by ASUS on 2017/7/17 0017.
 */

// 工具
var util = require('util');
// 配置信息
var config = require("../../common/config");
// 数据库类型
var dbType = "Shit" + config.database.type;
// 数据库操作类
var DBClass = require("../db/" + dbType)[dbType];
// 数据库操作对象
var db = new DBClass(config.database.host, config.database.port, config.database.user,
    config.database.password, config.database.database, config.database.charset);

/**
 * model层的基类，所有的model类都继承于它，包含了对数据库操作的一切功能
 * @constructor
 */
function ShitModel() {
}

/**
 * 赋予原型对象
 * @type {{id: number, allParams: allParams, save: save, delete: delete, update: update, query: query, findById: findById}}
 */
ShitModel.prototype = {
    /**
     * 主键值
     */
    id : 0,

    /**
     * 获取所有的内参，不过这里有个比较大的问题就是,不能有除了储存参数外其他以get为头的函数
     * @returns {{}}
     */
    allParams : function() {
        var json = {};
        for (name in this) {
            if (name.substr(0,3) === 'get'&& typeof this[name] === 'function') {
                json[name.substr(3, 4).toLowerCase() + name.substr(4)] = this[name]();
            }
        }

        return json;
    },

    /**
     * 存入数据库
     */
    save : function() {
        db.insert(this.tableName, this.allParams());
    },

    /**
     * 从数据库删除
     */
    delete : function() {
        db.delete(this.tableName, this.keyName, this.id);
    },

    /**
     * 更新数据库
     */
    update : function(){
        db.update(this.tableName, this.allParams(), this.keyName, this.id);
    },

    /**
     * 查询
     * @param params 查询条件键值对
     * @param sqlOther 其他sql语句
     * @param func 回调函数，其参数是查询结果的集合
     */
    query : function(params, sqlOther, func) {
        // 获取当前对象的构造函数
        var modelConstructor = this.constructor;
        db.select(this.tableName, ['*'], params, sqlOther, function(results) {
            // 初始化查询的返回集合
            var models = [];
            for (i in results) {
                // 将返回值取出
                var result = results[i];
                // 初始化对象
                var model = new modelConstructor();
                for (name in result) {
                    // 取出查询的值
                    var value = result[name];
                    // 去掉字段前缀
                    var realName = name.substr(config.database.column_pre.length);
                    // 如果是主键直接赋值，如果非主键用set函数赋值
                    if (realName === model.keyName) {
                        model.id = value;
                    } else {
                        var setName = 'set' + realName.substr(0,1).toUpperCase() + realName.substr(1);
                        model[setName](value);
                    }
                }
                models[models.length] = model;
            }
            // 将结果集传入回调函数
            func(models);
        });
    },

    /**
     * 根据id查找
     * @param id id
     * @param func 回调函数
     */
    findById : function(id, func) {
        var params = {};
        params[this.keyName] = id;
        this.query(params,'',function(models) {
            func(models[0])
        })
    },

    findAll : function(func) {
        this.query({}, 'order by ' + this.keyName + ' desc',function(models) {
            func(models)
        })
    }
}

// 开放继承ShitModel接口
exports.inheritsShitModel  = function(Class) {
    util.inherits(Class, ShitModel);
}