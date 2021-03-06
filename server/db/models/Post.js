const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50,
        minlength: 2,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 500,
        minlength: 5,
        required: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    imageName: {
        type: String,
        required: true
    },
    tags : {
        type: [String],
        default: [],
        required: true
    },
    regions : {
        type: Array,
        default: [],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);

