const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log('req.params', req.params)
        const { kind, _id } = req.params;
        cb(null, `./public/${kind}`);
    },
    filename(req, file, cb) {
        cb(null, (new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname))
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage, fileFilter
});

module.exports = upload;


