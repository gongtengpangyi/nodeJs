/**
 * Created by ASUS on 2017/7/17 0017.
 */

// 数据库的配置信息
exports.database = {
    type : 'Mysql',     // 数据库软件
    host     : 'localhost',     // 主机IP
    user     : 'root',      // 用户名
    password : 'wjfrz',     // 密码
    database : 'shop',      // 数据库
    charset : 'UTF8_GENERAL_CI',    // 数据库连接编码
    port : 3306,        // 端口号
    table_pre: 'info_',     // 表前缀
    column_pre:''       // 字段前缀
}

// 应用的配置
exports.app = {
    port : 8000,     // http端口号
    defaultController : 'login',        // 默认控制器
    defaultAction : 'index',        // 默认操作
    templatesPath : './www/templates',      // 模板相对node命令执行路径
    templatesCharset : 'utf-8',      // 模板编码格式
    templatesSymbol : ['{{', '}}'],      // 模板占位符
    staticPath : './www/static'
}

