const express = require('express');

function createRouter(db) {
  const router = express.Router();

  
  //request de post
  router.post('/products', (req, res) => {
    //query sql
    db.query(
      'INSERT INTO Produto ( nome, preco, descricao, quantidade ) VALUES (?,?,?,?)',
      [req.body.nome, req.body.preco, req.body.descricao, req.body.quantidade],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: error });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
  //resquest de get
  router.get('/products', function (req, res) {
    db.query(
      //operação ternaria para definir se o get será para um item ou para todos.
      req.params.id ? 'SELECT * FROM Produto WHERE id=?' : 'SELECT * FROM Produto',
      req.params.id ? [req.params.id] : '',
      (error, results) => {
        if (error) {
          console.log(error);
          //retorna a mensagem de erro no body da requisição.
          res.status(500).json({ message: error });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  //put request 'update'
  router.put('/products/:id', function (req, res) {
    db.query(
      'UPDATE Produto SET nome=?, preco=? ,descricao=?, quantidade=? WHERE id=?',
      //o req.params.id está diferente por que ele puxa o id na nossa url.
      [req.body.nome, req.body.preco, req.body.descricao, req.body.quantidade, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ message: error });
        } else {
          res.status(200).json({ status: `Produto com o id: ${req.params.id} atualizado com sucesso.` });
        }
      }
    );
  });
  //request de dele
  router.delete('/products/:id', function (req, res) {
    db.query(
      'DELETE FROM Produto WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          //utilizando http status para retornar a mensagem de erro
          res.status(500).json({ message: error });
        } else {
          //utilizando a craze para concatenar a string
          res.status(200).json({ status: `Produto com o id: ${req.params.id} deletado com sucesso!` });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;