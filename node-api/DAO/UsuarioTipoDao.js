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

TipoDao.prototype.update = function(newNome, id, callback) {
  this._connection.query('UPDATE tipo SET nome = ? WHERE id = ?', [newNome.nome, id], callback);
}

TipoDao.prototype.delete = function(id, callback) {
  this._connection.query('DELETE FROM tipo WHERE id = ?', id, callback);
}

module.exports = () => TipoDao;