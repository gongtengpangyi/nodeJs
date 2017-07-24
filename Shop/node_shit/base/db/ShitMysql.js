/**
 * Created by ASUS on 2017/7/17 0017.
 */

// 导入依赖
var mysql = require('mysql');
var util = require('util');
var config = require('../../common/config').database;

/**
 * Mysql数据库封装类
 * @param host 主机IP
 * @param port 数据库软件端口（mysql的默认端口基本是3306）
 * @param user 数据库用户名
 * @param password 数据库密码
 * @param database 数据库名
 * @param charset 编码格式
 * @constructor
 */
function ShitMysql(host, port, user, password, database, charset) {

    var mysqlConfig = {
        host     : host,
        user     : user,
        password : password,
        port: port,
        database : database,
        charset : charset
    };

    // 建立新的连接对象(私有)
    var connection;

    //连接数据库
    this.connect = function() {
        connection = mysql.createConnection(mysqlConfig)
        connection.connect();
    }

    // 断开连接
    this.close = function() {
        connection.end();
    }

    /**
     * 执行操作体
     * @param sql sql语句
     * @param sqlParam 占位符键值对
     * @param success 成功回调函数
     */
    this.execute = function(sql, sqlParam, success) {
        // 连接数据库
        this.connect();
        // 匹配冒号形式的占位符':xxx'
        var expr = new RegExp(':[a-z|A-Z]*');
        var name = expr.exec(sql);
        var params = [];// 最终的参数数组
        while (name) {
            /**
             * 循环所有占位符并改为？，然后从键值对中取出参数值堆入参数数组中
             */
            name = name[0];
            sql = sql.replace(name, "?");
            params[params.length] = sqlParam[name.substr(1)];
            name = expr.exec(sql);
        }
        console.log(sql);
        console.log(params);
        // 执行数据库的最终操作，并把成功的回调函数拼入完整的回调函数中
        connection.query(sql, params, function(error, result) {
            if (error) {
                throw error;
            }
            success(result);
        });
        // 关闭数据库连接
        this.close();
    }

    /**
     * 插入数据
     * @param tableName 表名（不带前缀）
     * @param object 键值对（json格式）
     */
    this.insert = function(tableName, object) {
        // 生成初始sql语句
        var sql = "insert into " + config.table_pre + tableName + "(";
        var sqlValue = " values(";
        for (name in object) {
            // 遍历键值对拼接sql语句
            sql = sql + config.column_pre + name + ', ';
            sqlValue = sqlValue + ':' + name + ', ';
        }
        sql = sql.substr(0, sql.length-2) + ')' + sqlValue.substr(0,sqlValue.length-2) + ');';
        // 执行sql语句
        this.execute(sql, object, function(result){})
    }

    /**
     * 根据id更新
     * @param tableName 无前缀表名
     * @param object 参数键值对
     * @param key 主键名
     * @param keyValue 主键值
     */
    this.update = function(tableName, object, key, keyValue) {
        // 初始sql语句
        var sql = "update " + config.table_pre + tableName + " set ";
        for (name in object) {
            // 遍历拼接
            sql = sql + config.column_pre + name + '=:' + name + ', ';
        }
        sql = sql.substr(0, sql.length-2) + ' where ' + key + '=' + keyValue + ';';
        // 执行
        this.execute(sql, object, function(result){});
    }

    /**
     * 根据主键删除
     * @param tableName 表名
     * @param key 主键名
     * @param keyValue 主键值
     */
    this.delete = function(tableName, key, keyValue) {
        var sql = 'delete from ' + config.table_pre + tableName + ' where ' + key + '=' + keyValue + ';';
        this.execute(sql,{},function(result){})
    }

    /**
     * 查询
     * @param tableName 表名
     * @param params 返回的参数列表（包括'*'）
     * @param object 查询条件键值对
     * @param sqlOther 其他语句（什么 order by 啊 group by 啊之类的）
     * @param func 查询成功的回调函数
     */
    this.select = function(tableName, params, object, sqlOther, func) {
        // 初始sql
        var sql = 'select ';
        for (var i = 0; i<params.length; i++) {
            // 循环拼接返回参数
            sql = sql + params[i] + ', ';
        }
        // 接着拼接条件语句
        sql = sql.substr(0,sql.length-2) + " from " + config.table_pre + tableName + " where ";
        // 截取字符串长度
        var cutLength = 6;
        for (name in object) {
            cutLength = 4;
            sql = sql + config.column_pre + name + '=:' + name + ' and ';
        }
        sql = sql.substr(0, sql.length-cutLength) + sqlOther;
        // 执行sql语句
        this.execute(sql, object, func)
    }

}

// 公开模块ShitMysql
exports.ShitMysql = ShitMysql;