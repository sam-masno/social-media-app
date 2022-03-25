const { Post } = require('../../db/models');
const { asyncHandler } = require('../../utils');

module.exports = asyncHandler(async(req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate('author');

    if(!post) throw new Error('Post does not exist');

    post.author.password = undefined;

    res.json({ success: true, post });
});
