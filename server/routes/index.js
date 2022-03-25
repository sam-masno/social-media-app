const router = require('express').Router();
const { handleJwt } = require('../middleware');

router.use(handleJwt);

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./posts'));

module.exports = router;