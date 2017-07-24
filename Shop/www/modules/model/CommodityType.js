/**
 * Created by ASUS on 2017/7/17 0017.
 */
require('../../../node_shit/base/app/ShitModel').inheritsShitModel(CommodityType);

/**
 * CommodityType类
 * @constructor
 */
function CommodityType() {
    var commtyptName;
    this.setCommtyptName = function(a) {
        commtyptName = a;
    };
    this.getCommtyptName = function() {
        return commtyptName;
    };

}

CommodityType.prototype.keyName = 'commtypeId';
CommodityType.prototype.tableName = 'comm_type';



module.exports = CommodityType;