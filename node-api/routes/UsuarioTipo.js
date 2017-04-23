module.exports = (app) => {
  const routePath = '/';
  const ControllerUsuarioTipo = app.controller.ControllerUsuarioTipo;
  
  app.get(`${routePath}:id?`, (req, res) => {
    const id = req.params.id;
    return selectUsuarioTipo(req, res, id);
  });

  app.post(routePath, (req, res) => {
    ControllerUsuarioTipo.save(req, (err, result) => {
      if (err) res.status(400).json(err);
      return selectUsuarioTipo(req, res, result.insertId );
    });
  });

  app.put(`${routePath}:id?`, (req, res) => {
    const id = req.params.id;
    let paramsErrors = checkParams(req);

    if (paramsErrors) return res.status(400).json( paramsErrors );

    ControllerUsuarioTipo.update(req, id, (err, result) => {
      if (err) res.status(400).json(err);
      return selectUsuarioTipo(req, res);
    });
  });

  function selectUsuarioTipo(req, res, id) {
    if (id) {
      return ControllerUsuarioTipo.selectById(id, ( err, result ) => {
        if (err) res.status(400).json(err);
        return res.status(200).json( setResponseForUser(result) );
      });
    }

    return ControllerUsuarioTipo.selectAll(( err, result ) => {
      if (err) res.status(400).json(err);
      return res.status(200).json( setResponseForUser(result) );
    });
  }

  function setResponseForUser(data) {
    return {
      tipos_usuario: data,
      links: [
        {
          link: `http://localhost:3000/tipos/:id-tipo`,
          method: 'PUT',
          rel: 'Atualizar tipo'
        },
        {
          link: `http://localhost:3000/tipos/`,
          method: 'POST',
          rel: 'Incluir novo tipo de usuario'
        },
        {
          link: `http://localhost:3000/tipos/`,
          method: 'GET',
          rel: 'Lista todos os tipos'
        },
        {
          link: `http://localhost:3000/tipos/:id-tipo`,
          method: 'GET',
          rel: 'Lista apenas o tipo com o id passado'
        }
      ]
    };
  }

  function checkParams(req) {
    let paramsErrors;
    req.checkParams('id', 'Parâmetros inválidos!')
      .notEmpty()
      .isInt().withMessage('Tipo do parâmetro é inválido!');
    paramsErrors = req.validationErrors();
    if (paramsErrors) return paramsErrors;
    return false;
  }

}