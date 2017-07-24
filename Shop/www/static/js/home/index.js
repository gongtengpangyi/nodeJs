/**
 * Created by ASUS on 2017/7/22 0022.
 */
$(function () {
    init();
})

var commParams = {
    commommName: '商品名',
    commommPurprice: '进价',
    commommPrice: '价格',
    commommStock: '数量',
    commommTypeId: '类型编号',
    commommsuppId: '提供商编号',
    id: 20}

function init() {
    for (i in commodities) {
        var commodity = commodities[i];
        console.log(commodity)
        var $li = $('<li>').appendTo($('#ul_commodities'));

        for (name in commodity) {
            $("<span>").text(commParams[name] + ':' + commodity[name] + ",  ").appendTo($li);
        }
    }
}

