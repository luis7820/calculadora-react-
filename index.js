const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calculadora_db'
});

// RUTA PARA GUARDAR
app.post('/guardar', (req, res) => {
  const { operacion, resultado } = req.body;
  const query = 'INSERT INTO historial (operacion, resultado) VALUES (?, ?)';
  
  db.query(query, [operacion, resultado], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al guardar');
    } else {
      res.status(200).send({ message: 'Guardado con éxito' });
    }
  });
});

app.listen(4000, () => console.log('Servidor en puerto 4000'));