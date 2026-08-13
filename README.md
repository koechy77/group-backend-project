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

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:
   ```
   DATABASE_URL=mongodb://your-connection-string
   PORT=5000
   NODE_ENV=development
   ```

3. Start the application:
   ```bash
   npm start
   ```
   Or for development with live reload:
   ```bash
   npm run dev
   ```

> Note: `npm run dev` uses `nodemon`. If you don't have it installed globally, install it locally with `npm install -g nodemon`.

## Project structure

- `src/config` - database and configuration setup
- `src/routes` - API route definitions
- `src/controllers` - request handling and business logic
- `src/models` - Mongoose data models
- `src/schema` - request validation schemas
- `src/middlewares` - custom Express middleware
- `src/app.js` - global middleware setup and app export

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

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

