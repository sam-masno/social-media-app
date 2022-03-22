const router = require('express').Router();

router.use('/users', (req, res) => res.json('users works'));

module.exports = router;