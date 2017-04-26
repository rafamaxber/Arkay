const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const Logger = require('../services/Logger');

module.exports = () => {
  const app = express();
  //add morgan midleware
  app.use(morgan('common', {
    stream: {
      write: (message) => Logger.info( message )
    }
  }));
  // parse application/x-www-form-urlencoded
  app.use( bodyParser.urlencoded({ extended: false }) );
  // parse application/json
  app.use( bodyParser.json() );
  // aplly midleware validator in all requisition
  app.use(expressValidator());
  
  consign()
    .include('DAO')
    .then('controller')
    .then('routes')
    .into(app);
    
  return app;
}