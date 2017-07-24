/**
 * Created by ASUS on 2017/7/18 0018.
 */

// 继承
require('../../../node_shit/base/app/ShitController').inheritsShitController(HomeController);

/**
 * 登录控制
 * @constructor
 */
function HomeController () {

    /**
     * 初始化主界面
     * @param params get参数
     * @param body post参数
     * @param res 响应
     */
    this.index = function(params, body, res) {
        var control = this;
        this.model('Commodity').findAll(function(commodities) {
            var array = [];
            for (i in commodities) {
                var json = commodities[i].allParams();
                json.id = commodities[i].id;
                array[i] = json;
            }
            console.log(array);

            control.design('commodities', JSON.stringify(array))
            control.display(res);
        })
    }


}

module.exports = HomeController;