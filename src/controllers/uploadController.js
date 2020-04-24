const UPLOAD_DIR = 'public/'
const uploadRoutes = require('express').Router();
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
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

uploadRoutes.route('/profile/').post(upload.single('avatar'), (req, res) => {
    console.log(req.file);
    let { name, email } = req.body;
    return res.status(201).json({ file: req.file, ...req.body })
})

uploadRoutes.route('/profile/:name').get((req, res) => {
    let { name } = req.params;
    if (fs.existsSync(`${UPLOAD_DIR}${name}`)) {
        let realPath = fs.realpathSync(`${UPLOAD_DIR}${name}`)
        return res.download(realPath, (err) => {
            console.error('Error during download')
        })
    } else {
        return res.status(404).json({ message: 'file not found' });
    }
})

uploadRoutes.route('/upload/file').post(upload.array('avatars', 4), (req, res) => {
    res.status(201).json({ ...req.files, ...req.body });
})

module.exports = uploadRoutes;