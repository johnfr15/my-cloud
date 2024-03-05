require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require("express");
const path = require('path');
const { pathLog } = require("./logger");
const { connect_mongodb } = require("./database/database.js");
const auth = require('./middleware/auth.js');
const authRouter = require('./routers/auth.js');
const { handleError } = require('./utils/error');



/***********************************|
|              CONFIG               |
|__________________________________*/
connect_mongodb(); // Connect to 'authentication' database
const app = express();




/***********************************|
|            APPLICATION            | 
|            MIDDLEWARE             |
|__________________________________*/
app.use( cookieParser() );
app.use( pathLog ); // Log only the request's path 
app.use( cors() ); // Allow everyone to request this server 
app.use( express.json() ); // Make able to read 'body' data sent in the request packet
app.use( express.urlencoded({ extended: true }) ); // Parse incoming requests with URL-encoded payloads.
app.use( auth.initialize() ); // Authentication using 'JSON Web Token'
app.use( express.static(path.join(__dirname, 'public')) );





/***********************************|
|             ROUTING               |
|__________________________________*/
app.use( '/auth', authRouter );





/***********************************|
|             ERRORS                |
|__________________________________*/
app.use( handleError );





/***********************************|
|           SERVER BOOT             |
|__________________________________*/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});