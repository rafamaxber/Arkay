const app = require('./config/express-config')();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Servidor rodando na porta: ', port);
});
