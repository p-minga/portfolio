const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 
  user: 
  password:
  database:
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/companies', (req, res) => {
  db.query('SELECT * FROM Companies', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/works', (req, res) => {
  db.query('SELECT * FROM Works', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/skills', (req, res) => {
  db.query('SELECT * FROM Skills', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/experiences', (req, res) => {
  db.query('SELECT * FROM Experiences', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
