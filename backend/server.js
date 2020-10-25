/**
 * Required External Modules
 */

const mongoose = require('mongoose');
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const { 
  authenticationRouter, 
  userRouter, 
  productRouter, 
} = require('./api/api');

const { authenticateAccessToken } = require('./middleware/jwt');
const { errorRouteHandler } = require('./middleware/errorHandler');

require('dotenv').config();

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || 8000;


/**
 * Passport Configuration
 */



/**
 *  App Configuration
 */

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MongoDB Connections
const uri = process.env.ATLAS_URI;

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection: ' + err);
  }
});

// Web Routing
const userProfileRouter = require('./routes/user');
// const invalidRouter = require('./routes/invalid');

app.use('/profile', userProfileRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/user', authenticateAccessToken, userRouter);
app.use('/api/product', productRouter);

app.get("/protected", authenticateAccessToken, async (req, res) => {
  res.send(`Welcome ${req.user.email} to the protected world.`);
});

app.use("*", errorRouteHandler);

app.listen(port, () => `Server running on port ${port} 🔥`);


