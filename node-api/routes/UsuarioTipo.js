const messages = require('../util/pt_br-messages');

module.exports = (app) => {
  const routePath = '/';
  const ControllerUsuarioTipo = app.controller.ControllerUsuarioTipo;
  const $private = {
    selectUsuarioTipo: (req, res, id) => {
      if (id) {
        return ControllerUsuarioTipo.selectById(id, ( err, result ) => {
          if (err) return res.status(400).json(err);
          return res.status(200).json( $private.setClientResponse(result) );
        });
      }

      return ControllerUsuarioTipo.selectAll(( err, result ) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json( $private.setClientResponse(result) );
      });
    },

    setClientResponse: (data) => {
      return {
        tipos_usuario: data,
        links: [
          {
            link: `http://localhost:3000/tipos/:id-tipo`,
            method: 'PUT',
            rel: messages.usuario_tipo.PUT
          },
          {
            link: `http://localhost:3000/tipos/:id-tipo`,
            method: 'DELETE',
            rel: messages.usuario_tipo.DELETE
          },
          {
            link: `http://localhost:3000/tipos/`,
            method: 'POST',
            rel: messages.usuario_tipo.POST
          },
          {
            link: `http://localhost:3000/tipos/`,
            method: 'GET',
            rel: messages.usuario_tipo.GET_ALL
          },
          {
            link: `http://localhost:3000/tipos/:id-tipo`,
            method: 'GET',
            rel: messages.usuario_tipo.GET
          }
        ]
      };
    },

    checkParams: (req) => {
      req.checkParams('id', messages.urlParams_undefined)
        .notEmpty()
        .isInt().withMessage(messages.urlParams_type);
      const paramsErrors = req.validationErrors();
      if (paramsErrors) return paramsErrors;
      return false;
    },

    checkBody: (req) => {
      const bodyLength = Object.keys(req.body).length;
      if ( bodyLength === 0 ) return { 
        "msg": messages.req_body_empty, 
        "body": req.body
      };
      return false;
    }
  }

  app.get(`${routePath}:id?`, (req, res) => {
    return $private.selectUsuarioTipo(req, res, req.params.id);
  });

  app.post(routePath, (req, res) => {
    const checkBody = $private.checkBody(req);
    if (checkBody) return res.status(400).json( checkBody );
    ControllerUsuarioTipo.save(req, (err, result) => {
      if (err) return res.status(400).json(err);
      return $private.selectUsuarioTipo(req, res, result.insertId );
    });
  });

  app.put(`${routePath}:id?`, (req, res) => {
    const id = req.params.id;
    const paramsErrors = $private.checkParams(req);
    const checkBody = $private.checkBody(req);
    if (paramsErrors) return res.status(400).json( paramsErrors );
    if (checkBody) return res.status(400).json( checkBody );

    ControllerUsuarioTipo.update(req, id, (err, result) => {
      if (err) return res.status(400).json(err);
      return $private.selectUsuarioTipo(req, res, id);
    });
  });

  app.delete(`${routePath}:id?`, (req, res) => {
    const id = req.params.id;
    const paramsErrors = $private.checkParams(req);

    if (paramsErrors) return res.status(400).json( paramsErrors );

    ControllerUsuarioTipo.delete(req, id, (err, result) => {
      if (err) return res.status(400).json(err);
      if( result.affectedRows )
        return $private.selectUsuarioTipo(req, res, id);
      
      return res.status(411).json({ "msg": messages.nothing_found });
    });
  });

}