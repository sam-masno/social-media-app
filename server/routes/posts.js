const router = require('express').Router();
const { 
    createPost, 
    getPost, 
    getAllPosts, 
    updatePost, 
    deletePost 
} = require('../controllers');

const { protected, isPostOwner } = require('../middleware');

router.use(protected);

router.route('/')
    .post(createPost)
    .get(getAllPosts);

router.route('/:postId')
    .get(getPost)
    .put(isPostOwner, updatePost)
    .delete(isPostOwner, deletePost);

module.exports = router;