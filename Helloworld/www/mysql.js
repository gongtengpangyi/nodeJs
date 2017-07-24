var mysql = require('mysql');
var util = require('util');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wjfrz',
    database : 'shop'
});

connection.connect();

connection.query('SELECT * from info_admin', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});