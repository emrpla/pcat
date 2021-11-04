const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1; // Url'de query yoksa direkt 1. sayfa olarak algıla
    const photosPerPage = 2; // Bir sayfada kaç foto gözükeecek

    const totalPhotos = await Photo.find().countDocuments(); // Veritabanında kaç foto var

    const photos = await Photo.find({})
        .sort('-dateCreated')
        .skip((page - 1) * photosPerPage)
        .limit(photosPerPage);

    res.render('index', {
        photos: photos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage),
    });
};

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo: photo,
    });
};

exports.createPhoto = async (req, res) => {
    //Upload Photo
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        });
        res.redirect('/');
    });
};

exports.updatePhoto = async (req, res) => {
    //Update photo
    // const photo = await Photo.findOne({ _id: req.params.id }); --> second way
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
    //Delete photo
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage); // Foto kod içerisinden silinir
    await Photo.findByIdAndRemove(req.params.id); // Foto veritabanından silinir

    res.redirect(`/`);
};
