require('dotenv').config();
require('./db/connectDB');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require('multer')();

app.use(upload.any());
app.use(bodyParser.json());

app.use('/api', require('./routes'));
app.use(require('./controllers/errors/basicErrorHandler'));

app.listen(process.env.PORT || 3001, () => console.log('App running'));