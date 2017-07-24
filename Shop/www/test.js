/**
 * Created by ASUS on 2017/7/19 0019.
 */

//var ShitMysql = require('../node_shit/base/db/ShitMysql');
var ShitApp = require('../node_shit/base/app/ShitApp');
//
//var mysql = new ShitMysql.ShitMysql('localhost', 3306, 'root', 'wjfrz', 'Shop');

//mysql.select('admin',['*'],{account:'woteme'},'');


var admin = new ShitApp.model('admin');
//admin.setAccount('xxy');
//admin.setPassword('yyy')
//admin.save();

//admin.id = 25;
var commodity = ShitApp.model('commodity');
commodity.findAll(function(models){
    for (i in models) {
        console.log(models[i].allParams())
    }
});

var app = new ShitApp();
app.start();
