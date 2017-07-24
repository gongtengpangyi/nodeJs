/**
 * Created by ASUS on 2017/7/22 0022.
 */

/**
 * 请求响应的判断
 * @param data 响应内容
 * @param success 操作成功的回调函数
 * @param error 操作失败的回调函数
 */
function result(data, success, error) {
    var json = JSON.parse(data);
    if (json.result === 'success') {
        success(json.message);
    }  else if (json.result === 'error'){
        error(json.message);
    }
}