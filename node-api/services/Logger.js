const winston = require('winston');
const _path = require('path');
const fs = require('fs');
const path_name = _path.join(__dirname, '..', 'logs/');
if (!fs.existsSync(path_name)) {
  fs.mkdirSync(path_name);
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: `${path_name}info.log`,
      maxsize: 100000,
      maxFiles: 10
    })
  ]
});