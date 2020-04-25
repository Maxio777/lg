const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const { kind } = req.params;
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

const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({
    storage, fileFilter, limits
});

module.exports = upload;


