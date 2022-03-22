const router = require('express').Router();
const { basicErrorHandler } = require('../controllers');


// always last
router.use(basicErrorHandler);

module.exports = router;