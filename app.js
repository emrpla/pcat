const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Route
app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index');
});

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('about');
});

app.get('/add', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('add');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
