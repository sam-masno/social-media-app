const router = require('express').Router();
const { registerNewUser } = require('../')

router.route('/register')
    .get(registerNewUser);

module.exports = router;