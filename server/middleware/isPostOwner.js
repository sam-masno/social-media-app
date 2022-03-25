const { Post } = require('../db/models');
const { asyncHandler } = require('../utils');

module.exports = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if(!post) throw new Error('Post does not exist');

    if(post.author.toString() !== req.user._id.toString()) {
        throw new Error('Only the author of this post can perform this action');
    }

    req.post = post;

    next();
});
