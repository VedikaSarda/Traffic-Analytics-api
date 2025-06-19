const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/track', require('./routes/trackRoutes'));
app.use('/stats', require('./routes/analyticsRoutes'));

module.exports = app;
