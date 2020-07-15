const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, files, cb) => {
            cb(null, 'src/assets');
        },

        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),

    fileFilter: (req, file, cb) => {
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatAccepte => formatAccepte == file.mimetype);

        if(isAccepted){
            return cb(null, true);
        }

        return cb(null, false);
    }
}))