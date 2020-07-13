//o bodyparse e o express trabalham juntos nas request.
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
//estabilizando conexão.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'soft',
  password: 'password',
  database: 'SOFT_AUTUMN'
});

connection.connect();
const routes = require('./routes');

//se process.env.PORT for null ira rodar em 8080
const port = process.env.PORT || 8080;
/**utilizando o express e definindo que tipo de objeto sera chamado
 * no bodyParser vem um .json e passando a conexão para o arquivo de routes.
 * */
const app = express()
  .use(cors({ origin: 'http://localhost:4200' }))
  .use(bodyParser.json())
  .use(routes(connection));
//Sobe a aplicação e retorna no console em qual porta está conectado.
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


