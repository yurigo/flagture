require('dotenv').config();
const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000

app.get('/api/', (req, res) => {
    // let user = req.query.user;
    // let app = req.query.app;

    let { user , app } = req.query;

    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
        'SELECT * FROM ? WHERE user = ?',
        [app, user],
        function(err, results, fields) {
            //console.log(results); // results contains rows returned by server
            //return console.log(err)
            if (err) return res.json({error: err});
            if (results.length === 0) return res.json({mensaje: "el usuario no tiene flags"})

            let elem = results[0]

          res.json({
            flag1: elem.flag1,
            flag2: elem.flag2
        })
        }
      );
    
    connection.end();

  
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/?user=1&app=app1`)
})









