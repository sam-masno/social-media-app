const { asyncHandler } = require('../../utils');

module.exports = asyncHandler( async(req, res, next) => {
    const { user } = req;

    if(!user) {
        throw new Error('No user logged in');
    }

    res.json({ success: true, user });
})