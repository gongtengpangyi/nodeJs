/**
 * Created by ASUS on 2017/7/18 0018.
 */
$(function() {
    $('#btn_login').click(doLogin);
})

/**
 * 登录操作
 */
function doLogin() {
    var account = $('#input_account').val();
    var password = $('#input_password').val();
    if (account === '') {
        alert('账号不能为空');
        return;
    } else if (password === ''){
        alert('密码不能为空');
        return;
    }
    $.post('?controller=login&action=login',{
        account : account,
        password : password
    },function(data) {
        console.log(data);
        result(data, function(message) {
            // 成功
            console.log('成功')
            console.log(message);
            window.location.href = "?controller=home";
        }, function(messgae) {
            console.log(messgae);
        })

    });
}