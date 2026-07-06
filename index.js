// const express = require('express'); -> commonjs module -> outdated
import express from 'express'; // -> es module -> modern
import connectDB from './config/database.js';
// require('dotenv').config(); -> older approach to load .env variables

// import dotenv from 'dotenv';
// dotenv.config(); -> old approach to load .env variables

import HANDLERS from './handlers/index.js';
import errorMiddleware from './middlewares/error.js';

const app = express();
const port = process.env.PORT;

// old approach
function helloWorldOld(req, res) {
  res.send('Hello World!');
}

// new approach
// named function
const helloWorldNew = (req, res) => {
  res.send('Hello Again, World!');
};

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/', helloWorldNew);

connectDB();

app.use(express.json());
app.use("/", HANDLERS);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});