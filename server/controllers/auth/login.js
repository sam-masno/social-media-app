const { User } = require('../../db/models');
const { asyncHandler, signJwt } = require('../../utils');

module.exports = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    // validate login and return jwt
    const user = await User.findOne({ email });
    
    if(!user) throw new Error('User does not exist');

    const validPassword = await user.compare(password);
    if(!validPassword) throw new Error('Incorrect password');

    const token = signJwt(user._id);

    user.password = undefined;

    res.json({jwt: token, user });
});
