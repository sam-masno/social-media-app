const router = require('express').Router();
const { createPost, getPost, getAllPosts } = require('../controllers');
const { protected } = require('../middleware');

router.use(protected);

router.route('/')
    .post(createPost)
    .get(getAllPosts);

router.route('/:postId')
    .get(getPost);

module.exports = router;