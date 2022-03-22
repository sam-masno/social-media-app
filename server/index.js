require('dotenv').config();
require('./db/connectDB');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./routes'));
app.use(require('./controllers/errors/basicErrorHandler'));

app.listen(process.env.PORT || 3001, () => console.log('App running'));