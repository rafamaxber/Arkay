const Logger = require('../services/Logger');

module.exports = (app) => {

  const $private = {
    postValidation: ( req ) => {
      let validationErrors;
      req.assert('nome', 'É necessário enviar um nome de tipo válido!').notEmpty();
      validationErrors = req.validationErrors();
      if ( validationErrors ) {
        return validationErrors;
      }
      return false;
    },

    updateValidation: ( req ) => {
      let validationErrors;
      req.assert('nome', 'É necessário enviar um nome de tipo válido!').notEmpty().len(3, 100);;
      validationErrors = req.validationErrors();
      if ( validationErrors ) {
        return validationErrors;
      }
      return false;
    }
  }

  const ControllerTipo = {
    selectAll: (callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      UsuarioTipoDao.selectAll((err, result) => {
        return callback(err, result);
      });
    },
    
    selectById: (id, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      UsuarioTipoDao.selectById(id, (err, result) => {
        return callback(err, result);
      });
    },

    save: (req, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      const validationErrors = $private.postValidation( req );
      
      if ( validationErrors ) {
        return callback( validationErrors );
      }

      UsuarioTipoDao.save(req.body, (err, result) => {
        
        if ( err ) Logger.log('error', `Error when save new user type in data base, ${err}`);
        
        return callback(err, result);
      });
    },

    update: (req, id, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      const validationErrors = $private.updateValidation( req );
      
      if ( validationErrors ) {
        return callback( validationErrors );
      }
      
      UsuarioTipoDao.update(req.body, id, (err, result) => {
        
        if ( err ) Logger.log('error', `Error when update user type in data base, ${err}`);

        return callback(err, result);
      });
      
    },

    delete: (req, id, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );

      UsuarioTipoDao.delete(id, (err, result) => {
        return callback(err, result);
      });
      
    }
  }

  return ControllerTipo;
};
