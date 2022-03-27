const { asyncHandler } = require('../../utils');
const { writeFile, unlink } = require('fs').promises;
const { v4: uuid } = require('uuid');
const { imagePaths: { uploads } } = require('../../utils');
const getImageTags = require('../../clarifai');

module.exports = asyncHandler( async (req, res, next) => {
    const { post } = req;
    const { title, description } = req.body;

    const image = req.files[0];

    const errors = [];

    // validate update if property is in request
    if(title) {
        if (title.length < 2 || title.length > 50) {
            errors.push('Title must be between 2 and 50 characters.');
        }
        else post.title = title;
    }

    if(description) {
        if(description.length < 5 || description.length > 500) {
            errors.push('Description must be between 5 and 500 characters.');
        }
        else post.description = description;
    }  

    if(image && (image.mimetype.split('/')[0] !== 'image')) {
        errors.push('Invalid image file');
    }

    if(errors.length) {
        throw new Error(errors.join(' '));
    }


    const uploadName = uuid();
    const uploadPath = `${uploads}/${uploadName}.jpg`;
    const imageUrl = '/images/uploads/' + uploadName + '.jpg';
    const previousImage = `${uploads}/${post.imageName}.jpg`;
    let newPost;

    try {
        // handle image if file present, update tags. cleanup if save fails
        if(image) {
            const { tags, regions } = await getImageTags(image.buffer);
            await writeFile(uploadPath, image.buffer);
            post.tags = tags;
            post.regions = regions;
            post.imageName = uploadName;
            post.imageUrl = imageUrl;
        }
        newPost = await post.save();
    } catch (error) {
        await unlink(uploadName);
        throw error;
    }

    // cleanup old image
    await unlink(previousImage);

    res.json({ success: true, post: newPost });
});