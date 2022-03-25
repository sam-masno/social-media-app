const router = require('express').Router();
const { createPost } = require('../controllers');
const { handleJwt, protected } = require('../middleware');

router.route('/')
    .post(handleJwt, createPost);

module.exports = router;