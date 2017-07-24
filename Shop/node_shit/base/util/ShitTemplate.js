/**
 * Created by ASUS on 2017/7/18 0018.
 */
// 文件读取对象
var fs = require('fs');

/**
 * 模板引擎,不过目前还没有循环和条件语句，太复杂了如果要的话还是用现成的模板引擎吧
 * @param templatePath 模板路径
 * @param charset 模板编码
 * @param symbol 占位符
 * @constructor
 */
function ShitTemplate(templatesPath, charset, symbol) {
    var templatesPath = templatesPath;
    var charset = charset;
    // 匹配符号
    var symbol = symbol;
    var symbolCount = [symbol[0].length, symbol[1].length];

    /**
     * 匹配所有占位符的正则表达式
     * @type {RegExp}
     */
    var exprSymbol = new RegExp(symbol[0] + '.*' + symbol[1]);

    /**
     * 匹配aaa.bbb的占位符
     * @type {RegExp}
     */
    var exprObject = new RegExp(symbol[0] + '\\s*[a-z|.|A-Z]*\\s*' + symbol[1]);

    /**
     * 匹配import占位符
     * @type {RegExp}
     */
    var exprImport = new RegExp(symbol[0] + '\\s*import\\s*[a-z|/|A-Z]*.html\\s*' + symbol[1]);

    /**
     * 匹配aaa[num]形式的占位符
     * @type {RegExp}
     */
    var exprArray = new RegExp(symbol[0] + '\\s*[a-z|.|A-Z]*\\[[0-9|a-z|A-Z|\']*\\]\\s*' + symbol[1]);

    /**
     * 模板占位键值对
     * @type {{}}
     */
    var templateContent = {};

    /**
     * 输入模板占位符替代对象
     * @param name 键
     * @param value 值
     */
    this.design = function(name, value) {
        templateContent[name] = value;
    };

    /**
     * 清空模板匹配json
     */
    this.cleanContent = function() {
        templateContent = {};
    };

    /**
     * 读取模板内容
     */
    this.readTemplate = readTemplate;

    /**
     * 读取模板内容
     * @param file 文件名
     * @returns {*}
     */
    function readTemplate(file) {
        var data = fs.readFileSync(templatesPath + "/" + file, charset);
        return insertTemplate(data);
    };

    /**
     * 配置模板,控制占位符
     * @param data
     */
    function insertTemplate(data) {
        // 匹配所有的占位符
        var names = exprSymbol.exec(data);
        while (names) {
            var name = names[0];
            if (exprObject.test(name)) {
                // 如果是aaa.bbb形式的占位符
                data = insertObject(data, name);
            } else if (exprImport.test(name)) {
                // 如果是import形式的占位符
                data = insertImport(data, name);
            } else if (exprArray.test(name)) {
                // aaa[bbb]形式的占位符
                data = insertArray(data, name);
            } else {
                // 注入其他形式的
                data = insertOther(data, name);
            }
            names = exprSymbol.exec(data);
        }
        return data;
    }

    /**
     * 替换aaa.bbb类型的匹配
     * @param data 模板数据
     * @param name 替换的占位符
     * @returns {XML|string|void}
     */
    function insertObject(data, name) {
        // 去掉头尾匹配符号
        var realName = name.substr(symbolCount[0], name.length-symbolCount[0]-symbolCount[1]).replace(/(\s*$)/g, "").replace(/(^\s*)/g, "");
        // 根据'.'来打乱成数组
        var names = realName.split('.');
        var value = templateContent;
        // 获取占位符所代替的数据并替换
        for (var i = 0; i<names.length; i++) {
            value = value[names[i]];
        }
        return data.replace(name, value);
    }

    /**
     * 替换import类型
     * @param data 模板数据
     * @param name 替换的占位符
     * @returns {XML|string|void}
     */
    function insertImport(data, name) {
        var fileName = new RegExp('[a-z|/|A-Z]*.html').exec(name)[0];
        return data.replace(name, readTemplate(fileName));
    }

    /**
     * 数组形式的占位符
     * @param data 模板内容
     * @param name 占位符内容
     */
    function insertArray (data, name) {
        // 匹配[...]的内容
        var num = new RegExp('\\[[a-z|A-Z|0-9|\']*\\]').exec(name)[0];
        // 获取前缀
        var pre = name.substr(symbolCount[0], name.length-symbolCount[0]-symbolCount[1])
            .replace(num, '').replace(/(\s*$)/g, "").replace(/(^\s*)/g, "");
        var pres = pre.split('.');
        var value = templateContent;
        // 获取占位符所代替的数据并替换
        for (var i = 0; i<pres.length; i++) {
            value = value[pres[i]];
        }
        // 将[]内的字符串获取出
        num = num.substr(1,num.length-2);
        if (num.substr(0,1)==='\'') {
            num = num.substr(1,num.length-2);
        }
        // 替换数据
        return data.replace(name, value[num]);
    }

    /**
     * 其他情况下的注入
     * @param data 模板内容
     * @param name 占位符内容
     */
    function insertOther(data, name) {
        var realName = name.substr(symbolCount[0], name.length-symbolCount[0]-symbolCount[1]).replace(/(\s*$)/g, "").replace(/(^\s*)/g, "");
        try {
            return data.replace(name, eval("templateContent." + realName));
        } catch (e) {
            return data.replace(name, '');
        }
    }

}

module.exports = ShitTemplate;
