require('dotenv').config();
const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000

app.get('/api/', (req, res) => {
  // let user = req.query.user;
  // let app = req.query.app;

  let { user, app } = req.query;

  const connection = mysql.createConnection(process.env.DATABASE_URL);

  // QUERY!
  /**
   * Los valores de las consultas deben ser escapados para evitar inyección de SQL al escribir la query.
   * Para escapar los valores podemos utilizar ?
   * ver: https://github.com/mysqljs/mysql#escaping-query-values
   * Para escapar los identificadores (nombres de tabla, campos, etc) podemos utilizar ??.
   * ver: https://github.com/mysqljs/mysql#escaping-query-identifiers
   */

  // Convertir a una promesa (a mano)
  const results = new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM ?? WHERE user = ?',
      [app, user],
      function (err, results, fields) {

        if (err) return reject(err);
        if (results.length === 0) return resolve({ mensaje: "el usuario no tiene flags" })
        let elem = results[0]

        resolve({
          flag1: elem.flag1,
          flag2: elem.flag2
        })
      }
    );
  })

  results
    .then(result => { res.json(result) })
    .catch(err => { res.json({ error: err }) })

  connection.end();
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/?user=1&app=app1`)
})
