const  { User } = require("../models/user")
const { validate_signup, validate_signin } = require("../utils/validations/auth");
const { 
    createUser, 
    authenticate, 
    confirmAccount,
} = require("../services/auth");
const { mailForgottenPassword, mailConfirmationEmail } = require("../services/mail");
const path = require('path');

const { SERVICE_BASE_PATH } = process.env

const handleSignup = async (req, res, next) => 
{
    try {

        // 1. Validate the user data
        const { error } = validate_signup( req.body );
        if ( error ) 
            return res.status(400).send( error.details[0].message );
        
        const { username, firstName, lastName, email, password } = req.body;

        // 2. Find user
        const oldUser = await User.findOne({ email });
        if ( oldUser && oldUser.activated ) 
            return res.status(409).json("User Already Exist. Please Login or choose a different email.");
        if ( oldUser && oldUser.username === username ) 
            return res.status(409).json("Username already taken. Please choose another one.");

        // 3. Signup user
        user = await createUser({ username, firstName, lastName, email, password });

        // 4. Send email to new user to authenticate him and activate the account
        await mailConfirmationEmail( user, email );

        // 5. Send response
        res.status(201).json({message: "A confirmation e-mail as been sent to activate your account!"});

    } catch (error) {

        next( error );

    }
};



const handleLogin = async (req, res, next) => 
{
   try {

        // 1. Validate the user data
        const { error } = validate_signin( req.body );
        if ( error ) 
            return res.status(400).json( error.details[0] );

        // 2. Create a token for the user, if successfully authenticated
        const { token } = await authenticate( req.body );

        // 3. Set the JWT token as a session cookie in the response
        const cookieOption = {
            httpOnly: true, 
            secure: true, 
        }
        res.cookie('jwt', token, cookieOption);
        res.status(200).redirect( SERVICE_BASE_PATH );

   } catch (error) {

        next(error);

   }
};



const handleForgotPassword = async(req, res) => 
{
    try {
        
        const { email } = req.body;
        const user = await find({ email });

        if ( !user )
            return res.status(401).json({ message: 'Invalid user.' })

        const resetToken = await createResetToken();
        mailForgottenPassword( user, email, resetToken );

        res.status(200).json("Email sent successfully !");

    } catch (error) {

        console.error('Error generating reset token:', error);
        res.status(500).json({ error: 'An error occurred while generating the reset token' });

    }
}



const handleConfirmationEmail = async(req, res, next) =>
{
    try {

        const { _id, secret } = req.params;
        const user = await User.findOne({ _id });

        if ( user === undefined )
            return res.status(401).redirect( path.join( SERVICE_BASE_PATH, 'register') )
        if ( user.isConfirmed )
            return res.status(401).redirect( path.join( SERVICE_BASE_PATH, 'login') )
        if ( Date.now() > user.tokenExpiration )
            return res.status(401).redirect( path.join( SERVICE_BASE_PATH, 'register') )
        if ( user.tokenActivation !== secret )
            return res.status(401).redirect( path.join( SERVICE_BASE_PATH, 'register') )

        await confirmAccount( user );

        return res.status(200).redirect( path.join( SERVICE_BASE_PATH, "login" ) );

    } catch (error) {

        console.error('Error activating account:', error);
        next( error );
        
    }
}



module.exports = {
    handleSignup,
    handleConfirmationEmail,
    handleLogin,
    handleForgotPassword,
};