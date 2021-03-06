const { User } = require('../../db/models');
const { writeFile, unlink } = require('fs').promises;
const { v4: uuid } = require('uuid');
const { signJwt } = require('../../utils');

const { 
    asyncHandler, 
    imagePaths: { userImage }, 
    emailRegex 
} = require('../../utils');

module.exports = asyncHandler(async (req, res, next) => {
    const { name, email, password} = req.body;
        
    const errors = [];
    //validate registration data
    if(!name || name.length < 2 || name.length > 45) {
        errors.push('Name is invalid.');
    }

    if(!emailRegex.test(email)) {
        errors.push('Email is invalid.')
    }

    if(!password || password.length < 6) {
        errors.push('Password invalid');
    }

    if(!req.files[0] || req.files[0].mimetype.split('/')[0] !== 'image') {
        errors.push('Image is invalid');
    }

    if(errors.length) {
        throw new Error(errors.join(' '))
    }

    const emailInUse = await User.findOne({ email });

    if(emailInUse) throw new Error('Email is already in use.')

    // write user image
    const imageName = uuid();
    const imageUrl = '/images/users/' + imageName + '.jpg';

    await writeFile(`${userImage}/${imageName}.jpg`, req.files[0].buffer);

    // create user, cleanup image if failed
    try {
        const user = await User.create({ name, email, password, imageUrl });
        const token = signJwt(user._id)
        user.password = undefined;
        return res.json({ success: true, jwt: token, user });
        
    } catch (error) {
        await unlink(`${userImage}/${imageUrl}`);
        throw error;
    }   

});