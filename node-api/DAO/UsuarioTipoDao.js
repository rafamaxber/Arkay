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
  let query = '';
  let sql = '';
  let inserts = [];
  Object.keys( tipo ).forEach(item => {
    query += ` ${item} = ?,`;
    inserts.push(tipo[item]);
  });
  query = query.replace(/,$/g, '');
  sql = 'UPDATE tipo SET' + query + ' WHERE id = ?';
  sql = this._connection.format(sql, inserts);
  this._connection.query(sql, [id], callback);
}

TipoDao.prototype.delete = function(id, callback) {
  this._connection.query('DELETE FROM tipo WHERE id = ?', id, callback);
}

module.exports = () => TipoDao;