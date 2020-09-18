const jwt = require('jsonwebtoken')


function restrict() {
    return async (req,res, next) => {
        const authError = {
            Message: "Invalid Credentials"
        }

        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json(authError)
            }

            /*  decode the token, resign the payload, check if signature is valid  */
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if  (err) {
                    return res.status(401).json(authError)
                }
            /*   we know the user is authorized at this point  */
            /*  make the tokens payload avail to other middleware functions  */
                req.token = decoded
                next()
            })
        }   catch(err) {
                next(err)
        }
    }  
}

module.exports = restrict