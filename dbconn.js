var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'abhinav@123',
  database : 'wwproject'
});

module.exports = connection;