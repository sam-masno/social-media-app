const { Post } = require('../../db/models');
const { asyncHandler } = require('../../utils');

module.exports = asyncHandler(async(req, res, next) => {
    const posts = await Post.find().populate({path: 'author', select:'-password'});
    res.json({ success: true, posts });
});