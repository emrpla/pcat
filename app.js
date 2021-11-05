const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// Connect DB
mongoose
    .connect(
        'mongodb+srv://emre:LjYN4qX2bsw2ZZz5@pcat-deneme.z5bnm.mongodb.net/pcat-db?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Db Connected!');
    })
    .catch((err) => {
        console.log(err);
    });
//if database doesn't exist create a new one

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000; // Use heroku port or use 5000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
