const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require('../models/user')

const { JWT_SECRET } = process.env;

const config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}

// Action that will trigger whenever a user send a request with a JWT bound in the 'Authorization' header into
// a protected route.
const strategy = new Strategy(config, async (jwtPayload, done) => 
{
  try {

    const user = await User.findOne({ email: jwtPayload.email });

    if ( !user ) 
    {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    done(null, user);

  } catch (error) {

    done(error);

  }
});

passport.use( strategy );

const initialize = () => 
{
  return passport.initialize();
};

const authenticate = () => 
{
  return passport.authenticate("jwt", { session: false });
};


module.exports = {
  initialize,
  authenticate,
};