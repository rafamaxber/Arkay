const Logger = require('../services/Logger');
const messages = require('../util/pt_br-messages');

module.exports = (app) => {

  const $private = {
    postValidation: ( req ) => {
      let validationErrors;
      req.assert('nome', messages.usuario_tipo.name)
        .notEmpty();
      req.assert('roles', messages.usuario_tipo.roles)
        .notEmpty();
      req.assert('level', messages.usuario_tipo.level)
        .notEmpty().isInt().withMessage(messages.usuario_tipo.level_type);
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
        if ( err ) Logger.log('error', `Error when list user type in data base, ${err}`);
        return callback(err, result);
      });
    },
    
    selectById: (id, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      UsuarioTipoDao.selectById(id, (err, result) => {
        if ( err ) Logger.log('error', `Error when list user type in data base, ${err}`);
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
      UsuarioTipoDao.update(req.body, id, (err, result) => {
        if ( err ) Logger.log('error', `Error when update user type in data base, ${err}`);
        return callback(err, result);
      });
      
    },

    delete: (req, id, callback) => {
      const connection = app.DAO.createDBconnection();
      const UsuarioTipoDao = new app.DAO.UsuarioTipoDao( connection );
      UsuarioTipoDao.delete(id, (err, result) => {
        if ( err ) Logger.log('error', `Error when delete type in data base, ${err}`);
        return callback(err, result);
      });
      
    }
  }

  return ControllerTipo;
};
