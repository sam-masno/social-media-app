const router = require('express').Router();
const { registerNewUser, login } = require('../controllers');
const upload = require('multer')();

router.route('/register')
    .post(upload.any(), registerNewUser);

router.route('/login')
    .post(login);

module.exports = router;