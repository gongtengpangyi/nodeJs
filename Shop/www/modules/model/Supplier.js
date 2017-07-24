/**
 * Created by ASUS on 2017/7/17 0017.
 */
require('../../../node_shit/base/app/ShitModel').inheritsShitModel(Supplier);

/**
 * Supplier类
 * @constructor
 */
function Supplier() {
    var suppName;
    var suppTel;
    var suppAddr;
    this.setSuppName = function(a) {
        suppName = a;
    };
    this.getSuppName = function() {
        return suppName;
    };
    this.setSuppTel = function(a) {
        suppTel = a;
    };
    this.getSuppTel = function() {
        return suppTel;
    };
    this.setSuppAddr = function(a) {
        suppAddr = a;
    };
    this.getSuppAddr = function() {
        return suppAddr;
    };

}

Supplier.prototype.keyName = 'suppId';
Supplier.prototype.tableName = 'comm_supp';



module.exports = Supplier;