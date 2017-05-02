const helperDAO = require('./helperDAO');

function TipoDao(connection) {
 this._connection = connection;
}

TipoDao.prototype.selectAll = function(callback) {
  helperDAO.select( 'tipo', this._connection, callback);
}

TipoDao.prototype.selectById = function(id, callback) {
  helperDAO.selectById( 'tipo', id, this._connection, callback);
}

TipoDao.prototype.save = function(tipo, callback) {
  helperDAO.save( 'tipo', this._connection, tipo, callback);
}

TipoDao.prototype.update = function(tipo, id, callback) {
  helperDAO.update( 'tipo', id, tipo, this._connection, callback);
}

TipoDao.prototype.delete = function(id, callback) {
  helperDAO.delete( 'tipo', id, this._connection, callback);
}

module.exports = () => TipoDao;