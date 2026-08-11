const express = require('express');
const app = express();

// global middleware
app.use(express.json());
app.use(morgan('dev'));

module.exports = app;

