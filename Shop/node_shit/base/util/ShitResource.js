/**
 * Created by ASUS on 2017/7/19 0019.
 */
var config = require('../../../node_shit/common/config').app;

var fs = require('fs');

/**
 * 资源获取类
 * @type {{static: static}}
 */
var ShitResource = {

    /**
     * 获取静态资源
     * @param res 响应
     * @param url 路径
     */
    static : function(res, url) {
        url = url.replace('/static', config.staticPath);
        var data = fs.readFileSync(url, config.templatesCharset);
        res.end(data);
    }
}

module.exports = ShitResource;