import dotenv from "dotenv";
dotenv.config()

import app from "./app";

const PORT = process.env.port || 8080;

import prisma from "./prisma/client"

async function connectDB(){
    try{
        await prisma.$connect();
        console.log("✅ Prisma DB has been connected")
    }catch (error){
        console.log(`❌ Error: ${error}`)
    }
}


connectDB();



app.listen(PORT, () =>{
    console.log(`App is running on port: ${PORT}`);
})