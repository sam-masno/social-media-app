const { asyncHandler } = require('../../utils');

module.exports = asyncHandler(async (req, res, next) => {
    await req.post.delete();
    res.json({ success: true })
});