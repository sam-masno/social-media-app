const jwt = require('jsonwebtoken');

module.exports = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "2 days"});
}
