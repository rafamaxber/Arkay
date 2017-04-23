const mysql = require('mysql');

function createDBConnection() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'arkay'
  });
}

module.exports = () => createDBConnection;
