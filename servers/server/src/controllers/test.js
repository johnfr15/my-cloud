const { log_post, log_get } = require("../services/test")

const log_p = async (req, res, next) => {

  try {

    log_post( req )
    res.send("success")
    
  } catch (error) {

    next(error);

  }
};

const log_g = async (req, res, next) => {

  try {

    log_get( req.body )
    res.send("success")
    
  } catch (error) {

    next(error);

  }
};

module.exports = {
 log_p,
 log_g,
};