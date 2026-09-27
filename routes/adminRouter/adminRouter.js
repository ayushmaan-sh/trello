require("dotenv").config()

const Router = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const JWT_SECRET = process.env.ADMIN_SECRET_KEY

const { adminModel } = require("../../database/database")
const adminRouter = Router()

adminRouter.post("/signup", async (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    try{
        const checkAdmin = await adminModel.findOne({
            username: username,
            email: email
        })

        if(!checkAdmin){

            const hashedPassword = await bcrypt.hash(password, 10)

            await adminModel.create({
                username: username,
                email: email,
                password: hashedPassword
            })

        } else {
            return res.send({
                message: "User with this email / username already exist."
            })
        }
    } catch (error) {
        return res.status(403).send({
            error: error.message
        })
    }
})

adminRouter.post("/signin", async (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    try {
        const checkAdmin = await adminModel.findOne({
            email: email,
        })

        if(checkAdmin){
            const checkAdminPassword = await bcrypt.compare(password, checkAdmin.password)

            if(checkAdminPassword){
                const token = jwt.sign({ id: checkAdmin._id }, JWT_SECRET)

                return res.json({
                    message: "Signed In successfully!",
                    token: token
                })
            } else {
                return res.json({
                    message: "Wrong Password!"
                })
            }
        } else {
            res.status(403).send({
                message: "Can't find user. Check Again!"
            })
        }
    } catch (error) {
        return res.status(403).send({
            error: error.message
        })
    }
})

module.exports = {
    adminRouter
}