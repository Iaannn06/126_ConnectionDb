const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const application = express();
const PORT = process.env.PORT || 3000;


application.use(bodyParser.json());


application.get('/', (req, res) => {
  res.send('Hello World!');
});


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: '3309',
  password: 'Sumbodro060405!',
  database: 'mahasiswa'
});


db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('✅ MySQL connected successfully');
});

application.get('/mahasiswa', (req, res) => {
  const query = 'SELECT * FROM biodata';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching data: ', err);
      res.status(500).send('Terjadi kesalahan pada server');
      return;
    }

    res.json(results);
  });
});


application.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
