require('dotenv').config();
const express = require('express')
const mysql = require('mysql2/promise');
const app = express()
const port = 3000

app.get('/api/', async (req, res) => {
  // let user = req.query.user;
  // let app = req.query.app;

  let { user, app } = req.query;

  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    // QUERY!
    /**
     * Los valores de las consultas deben ser escapados para evitar inyección de SQL al escribir la query.
     * Para escapar los valores podemos utilizar ?
     * ver: https://github.com/mysqljs/mysql#escaping-query-values
     * Para escapar los identificadores (nombres de tabla, campos, etc) podemos utilizar ??.
     * ver: https://github.com/mysqljs/mysql#escaping-query-identifiers
     */
  
    // Utilizando mysql2/promise que nos envuelve a promesa y nos devuelve [rows, fields] como resultado
    // y para capturar errores utilizamos catch.
    const queryResult = await connection.query('SELECT * FROM ?? WHERE user = ?', [app, user]);
    const [results, fields] = queryResult;
    if (results.length === 0) throw ("el usuario no tiene flags")

    // el primer elemento es el resultado de la query
    let elem = results[0]

    result = {
      flag1: elem.flag1,
      flag2: elem.flag2
    }

    res.json(result)

  } catch (err) {
    res.json({ error: err })
  }

  connection.end();
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/?user=1&app=app1`)
})
