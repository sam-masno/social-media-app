const router = require('express').Router();

router.use('/posts', (req, res) => res.json('posts works'));

module.exports = router;