# Group Backend Project

A simple backend API for managing users, products, and product reviews.

## Features

- Create, read, update, and delete users
- Create, read, update, and delete products
- Add reviews to products
- Link each review to a user and a product
- Validation via schema files
- MongoDB persistence using Mongoose

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

## Scripts

- `npm start` — run the server with Node
- `npm run dev` — run the server with nodemon for development

## Notes

- `src/config/db.js` contains the MongoDB connection logic
- `src/app.js` configures global middleware and exports the Express app
- `server.js` is expected to mount `src/app.js` and start the HTTP server
- `src/routes/reviewRoutes.js` contains review route wiring for the review endpoints

