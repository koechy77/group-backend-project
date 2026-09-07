# Group Backend Project

A REST API for managing users, products, and product reviews.

## Features

- Create, read, update, and delete users
- Create, read, update, and delete products
- Add reviews to products
- Link each review to a user and a product
- Validation via schema files
- MongoDB persistence using Mongoose
- Request metadata tracking for debugging and timing
- JWT-based signup, login, and protected user routes
- Product image uploads with Multer

## Tech stack

- Node.js and Express
- MongoDB with Mongoose
- dotenv for environment configuration
- morgan for request logging

## Getting started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:
   ```
    DATABASE_URL=mongodb://your-connection-string
   PORT=6000
   NODE_ENV=development
    JWT_SECRET=your-secret-key
    JWT_EXPIRES_IN=90d
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

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:userId` - Get a user by ID (requires authentication)
- `GET /api/v1/users/profile` - Get the authenticated user's profile
- `PATCH /api/v1/users/profile` - Update the authenticated user's profile
- `DELETE /api/v1/users/profile` - Delete the authenticated user's account
- `DELETE /api/v1/users/:userId` - Delete a user by ID (requires authentication)

### Authentication

- `POST /api/v1/auth/signup` - Create a user and return a JWT
- `POST /api/v1/auth/login` - Authenticate a user and return a JWT

Protected endpoints expect the token in the request header:

```http
Authorization: Bearer <token>
```

### Products

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:productId` - Get product by ID
- `POST /api/v1/products` - Create a new product
- `PUT /api/v1/products/:productId` - Update a product
- `DELETE /api/v1/products/:productId` - Delete a product
- `GET /api/v1/products/top-5-cheap` - Get the five cheapest products
- `GET /api/v1/products/stats` - Get product statistics
- `GET /api/v1/products/category-stats` - Get category statistics
- `GET /api/v1/products/top-rated` - Get top-rated products

Product creation accepts `multipart/form-data` with an optional `coverImage` field and up to five `images` fields.

### Reviews

- `GET /api/v1/:productId/reviews` - Get all reviews
- `GET /api/v1/:productId/reviews/:reviewId` - Get a review by ID
- `POST /api/v1/:productId/reviews` - Create a new review
- `PATCH /api/v1/:productId/reviews/:reviewId` - Update a review
- `DELETE /api/v1/:productId/reviews/:reviewId` - Delete a review

## Request timing middleware

The app includes a global custom middleware that attaches request time to each request object before the route controller runs.

```js
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});
```

This middleware is useful because:

- it records when a request started

Important: these values are stored on the current request object, not as a shared top-level variable. That means each request gets its own values and nothing is overwritten by another request.

Example usage in a controller:

```js
exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.requestTime);

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
- `src/server.js` connects to MongoDB and starts the HTTP server
- `src/routes/reviewRoutes.js` contains review route wiring for the review endpoints
- `utils/appError.js` contains the application error class used by the error handler

