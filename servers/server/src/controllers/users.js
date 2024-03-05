const { find } = require("../services/users");



const getUser = async(req, res, next) => {

    try {

        const token = req.cookies.jwt

        if ( token )
        {
            let user = await find( token )
            delete user.password 

            return ( res.status(200).json({ ...user, isAuthenticated: true }) )
        }

        res.status(200).json({ isAuthenticated: false })

    } catch (error) {

        console.log(error)
        next(error)

    }
}

module.exports = {
    getUser,
};