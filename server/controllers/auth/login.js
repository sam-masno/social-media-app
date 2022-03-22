const { User } = require('../../db/models');
const { asyncHandler, signJwt } = require('../../utils');

module.exports = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if(!user) throw new Error('User does not exist');

    if(!user.compare(password)) throw new Error('Incorrect password');

    const token = signJwt(user._id);

    user.password = undefined;

    res.json({jwt: token, user });
});
