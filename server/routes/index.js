const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./posts'));

module.exports = router;