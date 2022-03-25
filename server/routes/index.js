const router = require('express').Router();
const { handleJwt } = require('../middleware');

router.use('/auth', require('./auth'));

router.use(handleJwt);

router.use('/posts', require('./posts'));

module.exports = router;