const Joi = require('joi');

const validate_signup = ( user ) => 
{
    const schema = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().allow(''),
        lastName: Joi.string().allow(''),
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
    validate_signup,
    validate_signin,
};
