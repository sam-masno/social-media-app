const { verifyJwt, asyncHandler } = require('../utils');
const { User } = require('../db/models');

module.exports = asyncHandler(async (req, res, next) => {
    if(req.headers.authorization) {
        const [bearer, jwt] = req.headers.authorization.split(' ');
        if(bearer !== 'Bearer') throw new Error('Invalid token');

        if(!jwt) throw new Error('No token found');
        const { _id } = verifyJwt(jwt);

        const user = await User.findOne({ _id });

        if(user) {
            user.password = undefined;
    
            req.user = user;
        }
    }

    next();
})