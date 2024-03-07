require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require('path');
const { pathLog } = require("./logger");



const app = express();





/***********************************|
|            APPLICATION            | 
|            MIDDLEWARE             |
|__________________________________*/
app.use( pathLog ); // Log only the request's path 
app.use( cors() ); // Allow everyone to request this server 
app.use( express.static( path.join(__dirname, 'public') ) );





/***********************************|
|             ROUTING               |
|__________________________________*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});





/***********************************|
|           SERVER BOOT             |
|__________________________________*/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${ port }.`);
});