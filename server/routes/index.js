const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./user'));
router.use(require('./posts'));

module.exports = router;