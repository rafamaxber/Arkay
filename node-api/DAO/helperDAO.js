module.exports = {
  update: (tableName, object) => {
    let query = '';
    let inserts = [];
    Object.keys( object ).forEach(item => {
      query += ` ${item} = ?,`;
      inserts.push(object[item]);
    });
    query = 'UPDATE ' + tableName + ' SET' + query.replace(/,$/g, '') + ' WHERE id = ?';

    return {
      query: query,
      inserts: inserts
    }
  }
}