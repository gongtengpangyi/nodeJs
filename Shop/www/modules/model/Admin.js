/**
 * Created by ASUS on 2017/7/17 0017.
 */
require('../../../node_shit/base/app/ShitModel').inheritsShitModel(Admin);

/**
 * Admin类
 * @constructor
 */
function Admin() {
    var account;
    var password;
    this.setAccount = function(a) {
        account = a;
    };
    this.setPassword = function(a) {
        password = a;
    };
    this.getAccount = function() {
        return account;
    };
    this.getPassword = function() {
        return password;
    };
}

Admin.prototype.keyName = 'id';
Admin.prototype.tableName = 'admin';

/**
 * 根据账号查找
 * @param account 账号
 * @param func 回调函数
 */
Admin.prototype.findByAccount = function(account, func) {
    this.query({account:account},'order by ' + this.keyName + ' desc',func);
};

module.exports = Admin;