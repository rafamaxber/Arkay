module.exports = {

  update: (tableName, id, object, connection, callback) => {
    let query = '';
    let inserts = [];
    Object.keys( object ).forEach(item => {
      query += ` ${item} = ?,`;
      inserts.push(object[item]);
    });
    query = 'UPDATE ' + tableName + ' SET' + query.replace(/,$/g, '') + ' WHERE id = ?';

    let sql = connection.format(query, inserts);
    connection.query(sql, [id], callback);
  },

  select: (tableName, connection, callback) => {
    let query = `SELECT * FROM ${tableName}`;
    connection.query( query, callback );
  },
  
  selectById: (tableName, id, connection, callback) => {
    let query = `SELECT * FROM ${tableName} WHERE id = ?`;
    connection.query( query, id, callback );  
  },
  
  save: (tableName, connection, object, callback) => {
    let query = `INSERT INTO ${tableName} SET ?`;
    connection.query(query, object, callback);
  },
  
  delete: (tableName, id, connection, callback) => {
    let query = `DELETE FROM ${tableName} WHERE id = ?`;
    connection.query(query, id, callback);
  }

}