/**
 * Created by ASUS on 2017/7/18 0018.
 */

// 继承
require('../../../node_shit/base/app/ShitController').inheritsShitController(LoginController);

/**
 * 登录控制
 * @constructor
 */
function LoginController () {

    /**
     * 初始化登录界面
     * @param params get参数
     * @param body post参数
     * @param res 响应
     */
    this.index = function(params, body, res) {
        this.display(res);
    }

    /**
     * 登录
     * @param params get参数
     * @param body post参数
     * @param res 响应
     */
    this.login = function(params, body, res) {
        var account = body['account'];
        var password = body['password'];

        var control = this;
        this.model('Admin').findByAccount(account, function (admins) {
            var admin = admins[0]
            console.log(admin);
            if (typeof admin === 'undefined') {
                control.error(res, '用户不存在');
            } else if (admin.getPassword() !== password){
                control.error(res, '密码错误')
            } else {
                control.success(res, {id : admin.id, other: admin.allParams()});
            }

        });
    }
}

module.exports = LoginController;