const express = require('express');
const app = express();

// global middleware
app.use(express.json()); /* body parser */
app.use(morgan('tiny')); /* logger */

// global custom middleware
app.use((req, res, next) => {
    req.requestTime = new Date();
    next();
});


module.exports = app;

