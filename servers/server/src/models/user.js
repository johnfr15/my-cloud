// backend/models/user.js
const mongoose = require("mongoose");
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    isConfirmed: { type: Boolean, default: false },
    token: { type: String },
    tokenActivation: { type: String },
    tokenExpiration:{ type: Date },
});
const User = mongoose.model("user", userSchema);


const validate_signup = ( user ) => 
{
    const schema = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validate( user );
};

const validate_signin = ( user ) => 
{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        remember: Joi.boolean()
    });

    return schema.validate( user );
};

module.exports = {
    User,
    validate_signup,
    validate_signin,
};
