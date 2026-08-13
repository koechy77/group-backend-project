# Group Backend Project

A simple backend API for managing users, products, and product reviews.

## Features

- Create, read, update, and delete users
- Create, read, update, and delete products
- Add reviews to products
- Link each review to a user and a product
- Validation via schema files
- MongoDB persistence using Mongoose
- Request metadata tracking for debugging and timing

## Tech stack

- Node.js and Express
- MongoDB with Mongoose
- dotenv for environment configuration
- morgan for request logging

## Getting started

1. Install dependencies:
   npm install
2. Create a `.env` file in the project root with at least:
   - `DATABASE_URL` — your MongoDB connection URI
   - `PORT` — optional server port
3. Start the app:
   - `npm start`
   - or `npm run dev` for live reload

> Note: `npm run dev` uses `nodemon`. If you don't have it installed globally, install it locally or globally with `npm install -g nodemon`.

## Project structure

- `src/config` - database and configuration setup
- `src/routes` - API route definitions
- `src/controllers` - request handling and business logic
- `src/models` - Mongoose data models
- `src/schema` - request validation schemas
- `src/middlewares` - custom Express middleware
- `src/app.js` - global middleware setup and app export

## Request timing middleware

The app includes a global custom middleware that attaches request metadata to each request object before the route controller runs.

```js
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
```

This middleware is useful because:

- it records when a request started
- it captures the HTTP method and URL
- it logs how long the request took before finishing
- it is available to every controller through `req`

Important: these values are stored on the current request object, not as a shared top-level variable. That means each request gets its own values and nothing is overwritten by another request.

Example usage in a controller:

```js
exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.requestTime);
    console.log(req.requestMethod);
    console.log(req.requestPath);

    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

This works because Express passes the same `req` object through the middleware and into the controller for that particular request.

## Scripts

- `npm start` — run the server with Node
- `npm run dev` — run the server with nodemon for development

## Notes

- `src/config/db.js` contains the MongoDB connection logic
- `src/app.js` configures global middleware and exports the Express app
- `server.js` is expected to mount `src/app.js` and start the HTTP server
- `src/routes/reviewRoutes.js` contains review route wiring for the review endpoints

