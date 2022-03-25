const router = require('express').Router();
const { registerNewUser, login } = require('../controllers');

router.route('/register')
    .post(registerNewUser);

router.route('/login')
    .post(login);

module.exports = router;