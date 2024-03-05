const pathLog = (req, res, next) => {
    const { method, path } = req;
    console.log(
      `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    next();
}

module.exports = {
    pathLog,
}