const helperDAO = require('./helperDAO');

function TipoDao(connection) {
 this._connection = connection;
}

TipoDao.prototype.selectAll = function(callback) {
  this._connection.query('SELECT * FROM tipo', callback);
}

TipoDao.prototype.selectById = function(id, callback) {
  this._connection.query('SELECT * FROM tipo WHERE id = ?', id, callback);
}

TipoDao.prototype.save = function(tipo, callback) {
  this._connection.query('INSERT INTO tipo SET ?', tipo, callback);
}

TipoDao.prototype.update = function(tipo, id, callback) {
  let queryAndFields = helperDAO.update( 'tipo', tipo );
  let sql = this._connection.format(queryAndFields.query, queryAndFields.inserts);
  this._connection.query(sql, [id], callback);
}

TipoDao.prototype.delete = function(id, callback) {
  this._connection.query('DELETE FROM tipo WHERE id = ?', id, callback);
}

module.exports = () => TipoDao;