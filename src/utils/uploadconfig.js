const envs = require('../utils/config');
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, envs.UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        // ${file.mimetype}
        const extension = file.originalname.split('.').slice(-1)[0]
        cb(null, `avatar_${Date.now().toString()}.${extension}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const extension = file.originalname.split('.').slice(-1)[0].toLowerCase()
        const mimetypes = ['png', 'jpg', 'pdf']
        if (mimetypes.includes(extension))
            cb(null, mimetypes.includes(extension))
        else
            cb(null, false)
    }
})

module.exports = { upload };