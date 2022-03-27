const { Post } = require('../../db/models');
const { asyncHandler } = require('../../utils');

module.exports = asyncHandler(async(req, res, next) => {
    const { tag } = req.query;

    // query posts with tag, else return all
    const query = tag ? { tags: tag.toLowerCase() } : {};
    
    const posts = await Post.find(query).populate({path: 'author', select:'-password'});

    res.json({ success: true, posts, total: posts.length});
});