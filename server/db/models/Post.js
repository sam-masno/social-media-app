const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 2,
        trim: true,
        required: true
    },
    discription: {
        type: String,
        maxlength: 500,
        minlength: 5,
        required: true
    },
    imageUrl: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);

