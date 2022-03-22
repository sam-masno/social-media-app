const mongoose = require('mongoose');

(async () => {
    await mongoose.connect(process.env.DB_CONNECT_STRING)
        .then(() => console.log('mongoose connected'))
        .catch(err => console.log(err.message));
})();