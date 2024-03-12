const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require("crypto");
const { CustomError } = require("../utils/error");
const { User } = require('../models/user')



const { JWT_SECRET, SALT } = process.env;


const authenticate = async ({ email, password, remember }) => 
{
  const user = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare( password, user.password );

  if ( user && isPasswordValid )
  {
    const error =  new CustomError({
        statusCode: 401, // Unauthorized
        message: 'Invalid credentials.',
    });

    throw error
  }

  const expire = remember ? { expiresIn: 30 * 24 * 60 * 60 } : { expiresIn: 24 * 60 * 60 };
  const token = jwt.sign( { id: user._id, email }, JWT_SECRET, expire );

  return { token };
};



const createUser = async ({ username, email, firstName, lastName, password }) => 
{
  // Hash the password
  const salt = await bcrypt.genSalt( Number(SALT) );
  const hashedPassword = await bcrypt.hash( password, salt );

  // Create an user object
  let user = await User.create({
    firstName,
    lastName,
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    tokenActivation: crypto.randomBytes(20).toString('hex'),
    tokenExpiration: Date.now() + (24 * 60 * 60 * 1000),
  });

  return user;
};



const confirmAccount = async( user ) =>
{
  user.isConfirmed = true
  user.tokenActivation = null
  user.tokenExpiration = null
  user.save()
}


const resetToken = async(user) =>
{
  const resetToken = crypto.randomBytes(20).toString('hex');

  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + (60 * 60 * 1000) // Token expire in 1 hour

  s_users = JSON.stringify( user, null, 2 );
  await fs.writeFile( usersFilePath, s_users );

  return resetToken
}



module.exports = {
  authenticate,
  createUser,
  confirmAccount,
  resetToken,
};