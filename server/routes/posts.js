const router = require('express').Router();
const { createPost, getPost } = require('../controllers');
const { handleJwt, protected } = require('../middleware');

router.route('/')
    .post(handleJwt, protected, createPost);

router.route('/:postId')
    .get(getPost);

module.exports = router;