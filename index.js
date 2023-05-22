const express=require("express");
const {connection} = require("./db")

const app=express();
require('dotenv').config();
app.use(express.json());

app.use(route)

app.listen(process.env.port,async()=>{
    try
    {
        await connection
        console.log("db is connected");
    }
    catch(err)
    {
        console.log(err);
        console.log("db is not connected");
    }
    console.log(`http://localhost:${process.env.port}`)
})