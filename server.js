require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

async function main(){
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
        app.listen(3000)
        
    } catch (error) {
        return "Somethin went wrong!"
    }
}

main()