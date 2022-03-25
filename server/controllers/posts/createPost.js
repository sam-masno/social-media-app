const { asyncHandler, uploads: uploadsPath } = require('../../utils');
const { Post } = require('../../db/models');
const { writeFile, unlink } = require('fs').promises;
const { v4: uuid } = require('uuid');

module.exports = asyncHandler((req, res, next) => {
    return res.json(req.user);
    const { title, description } = req.body;

    const errors = [];

    if(!title) errors.push('Valid title required');

    if(!description) errors.push('Description is required.')

    if(!req.files[0] || req.files[0].mimetype.split('/')[0] !== 'image') {
        errors.push('Image is invalid.');
    }

    if(errors.length) {
        throw new Error(errors.join(' '))
    }

    const { buffer } = req.files[0];


    res.json(req.body);    
});