const { asyncHandler, imagePaths: {uploads} } = require('../../utils');
const { Post } = require('../../db/models');
const { writeFile, unlink } = require('fs').promises;
const { v4: uuid } = require('uuid');
const getImageTags = require('../../clarifai');


module.exports = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;

    const errors = [];

    // validate request
    if(!title || title.length < 2 || title.length > 50) errors.push('Title must be between 2 and 50 characters.');

    if(!description || description.length < 5 || description.length > 500) errors.push('Description must be between 5 and 500 characters.')

    if(!req.files[0] || req.files[0].mimetype.split('/')[0] !== 'image') {
        errors.push('Image is invalid.');
    }

    if(errors.length) {
        throw new Error(errors.join(' '))
    }

    // handle file and image tags, cleanup file if post creation fails
    const { buffer } = req.files[0];

    const { tags, regions } = await getImageTags(buffer);

    const uploadName = uuid();
    const uploadPath = `${uploads}/${uploadName}.jpg`;
    const imageUrl = '/images/uploads/' + uploadName + '.jpg';

    await writeFile(uploadPath, buffer);

    try {
        const post = await Post.create({ author: req.user, title, description, imageUrl, imageName: uploadName, tags, regions });
        res.json({ success: true, post });    
    } catch (error) {
        await unlink(uploadPath);
        throw error;
    }
});