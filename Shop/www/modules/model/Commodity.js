/**
 * Created by ASUS on 2017/7/17 0017.
 */
require('../../../node_shit/base/app/ShitModel').inheritsShitModel(Commodity);

/**
 * Commodity类
 * @constructor
 */
function Commodity() {
    var commName;
    var commPurprice;
    var commPrice;
    var commStock;
    var commTypeId;
    var commsuppId;

    this.setCommName = function (a) {
        commName = a;
    }

    this.getCommName = function () {
        return commName;
    }

    this.setCommPurprice = function (a) {
        commPurprice = a;
    }

    this.getCommPurprice = function () {
        return commPurprice;
    }

    this.setCommPrice = function (a) {
        commPrice = a;
    }

    this.getCommPrice = function () {
        return commPrice;
    }

    this.setCommStock = function (a) {
        commStock = a;
    }

    this.getCommStock = function () {
        return commStock;
    }

    this.setCommTypeId = function (a) {
        commTypeId = a;
    }

    this.getCommTypeId = function () {
        return commTypeId;
    }

    this.setCommsuppId = function (a) {
        commsuppId = a;
    }

    this.getCommsuppId = function () {
        return commsuppId;
    }
}

Commodity.prototype.keyName = 'commId';
Commodity.prototype.tableName = 'comm';

/**
 * 根据价格最小值查找
 * @param price 价格最小值
 * @param func 回调函数
 */
Commodity.prototype.findByMinPrice = function(price, func) {
    this.query({},'where commPrice > ' + price + ' order by ' + this.keyName + ' desc',func);
};

module.exports = Commodity;