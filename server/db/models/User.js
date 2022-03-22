const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 45,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    imageUrl: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

UserSchema.methods.compare = async function(challengePassword) {
    return bcrypt.compare(challengPassword, this.password);
}

// UserSchema.methods.genToken = function() {

// }

module.exports = mongoose.model('User', UserSchema);