require("dotenv").config()

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.ADMIN_SECRET_KEY

async function adminMiddleware (req, res, next) {
    const token = req.headers.token

    try{
        const decoded_Data = jwt.verify(token, JWT_SECRET)

        if(decoded_Data){
            req.adminId = decoded_Data.id,
            next()
        } else {
            return res.status(403).json({
                message: "Invalid Token!"
            })
        }
    } catch (error) {
        return res.status(403).json({
            error: error.message
        })
    }
}

module.exports = {
    adminMiddleware
}