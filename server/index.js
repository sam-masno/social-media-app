require('dotenv').config();
require('./db/connectDB');
const express = require('express');
const app = express();
const router = require('./routes');

app.use('/api', router);

app.listen(process.env.PORT || 3001, () => console.log('App running'));