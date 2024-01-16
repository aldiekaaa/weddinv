// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.json());

// Menangani file statis dari folder 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));

// Menambahkan middleware untuk menangani file statis dari folder 'test'
app.use('/romeo-juliet', express.static(path.join(__dirname, 'romeo-juliet')));

app.get('/romeo-julie', (req, res) => {
    res.sendFile(path.join(__dirname, '/romeo-julie/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/guestbook', (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync('guestbook.json', 'utf-8'));
    res.json(jsonData);
});

app.post('/guestbook', (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync('guestbook.json', 'utf-8'));
    const newEntry = {
        nama: req.body.nama,
        ucapan: req.body.ucapan,
        timestamp: new Date().toISOString(),
    };
    jsonData.push(newEntry);
    fs.writeFileSync('guestbook.json', JSON.stringify(jsonData, null, 2));
    res.json({ message: 'Ucapan berhasil ditambahkan!', ...newEntry });
});


// ...
