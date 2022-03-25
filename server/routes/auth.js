const router = require('express').Router();
const { registerNewUser, login, me } = require('../controllers');
const { handleJwt } = require('../middleware');

router.route('/register')
    .post(registerNewUser);

router.route('/login')
    .post(login);

router.route('/me')
    .get(handleJwt, me);

module.exports = router;