const { asyncHandler } = require('../utils');

module.exports = asyncHandler((req, res, next) => {
    if(!req.user) throw new Error('Not authorized');
})