const { upload } = require('../utils/uploadconfig');
const uploadRoutes = require('express').Router();
const fs = require('fs');

uploadRoutes.route('/profile/:name').get((req, res) => {
    let { name } = req.params;
    if (fs.existsSync(`${envs.UPLOAD_DIR}${name}`)) {
        let realPath = fs.realpathSync(`${envs.UPLOAD_DIR}${name}`)
        return res.download(realPath, (err) => {
            console.error('Error during download')
            return res.status(500).json(err.message)
        })
    } else {
        return res.status(404).json({ message: 'file not found' });
    }
})
module.exports = { uploadRoutes };