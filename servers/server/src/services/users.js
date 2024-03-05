
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const path = require("path");



const { JWT_SECRET } = process.env;
const usersFilePath = path.join(__dirname, "../../../db/users.json");



const find = async ( jwtToken ) => 
{
    const decoded = jwt.verify(jwtToken, JWT_SECRET);

    const s_users = await fs.readFile( usersFilePath );
    const users = JSON.parse( s_users );

    const user = users.find( (user) => user.id === parseInt(decoded.id) );

    return user;
};



module.exports = {
  find,
};