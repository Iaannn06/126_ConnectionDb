const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const application = express();
const PORT = process.env.PORT || 3000;

// Middleware agar bisa baca body JSON
application.use(bodyParser.json());

// Route default
application.get('/', (req, res) => {
  res.send('Hello World!');
});

// Koneksi database
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

// --- GET /mahasiswa (ambil semua data)
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

// --- POST /mahasiswa (tambah data)
application.post('/mahasiswa', (req, res) => {
  const { nama, alamat, agama } = req.body;

  // Validasi input
  if (!nama || !alamat || !agama) {
    return res
      .status(400)
      .json({ message: '❗ Semua field (nama, alamat, agama) wajib diisi.' });
  }

  // Query insert
  const query = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
  db.query(query, [nama, alamat, agama], (err, result) => {
    if (err) {
      console.error('❌ Error inserting data: ', err);
      res.status(500).send('Gagal menambahkan data ke database');
      return;
    }

    res.status(201).json({
      message: '✅ Data mahasiswa berhasil ditambahkan!',
      insertedId: result.insertId,
      data: { nama, alamat, agama },
    });
  });
});

// Jalankan server
application.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
