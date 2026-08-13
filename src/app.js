const express = require('express');
const app = express();
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// global middleware
app.use(express.json()); /* body parser */
app.use(morgan('tiny')); /* logger */

// global custom middleware
app.use((req, res, next) => {
    req.requestTime = new Date();
    req.requestMethod = req.method;
    req.requestPath = req.originalUrl;
    req.requestStartedAt = Date.now();

    res.on('finish', () => {
        const elapsedMs = Date.now() - req.requestStartedAt;
        console.log(`${req.requestMethod} ${req.requestPath} - ${elapsedMs}ms`);
    });

    next();
});

// mounted routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

module.exports = app;

