const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {Usermodel}=require("../model/user.model");
const e = require("express");
const fs=require("fs");
const {authorize}=require("../middleware/authorize")
const {authentication}=require("../middleware/authentication")
require('dotenv').config()
const route=express.Router();

route.get("/refresh",async(req,res)=>{
    let token=req.headers.authorization;
    if(token){
        let decoded=jwt.verify(token,process.env.refreshkey);
        if(decoded){
            console.log(decoded);
            let dataid=decoded.dataid;
            let role=decoded.role;

            let new_token=jwt.sign({dataid,role},process.env.secretkey,{expiresIn:60});
            res.send({"msg":"referesh token generrated",new_token});
        }
    }else{
        res.send({"msg":"login again"})
    }
})

route.post("/logout",async(req,res)=>{
    try {
        let token=req.headers.authorization;

        let blacklistAcc=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
        blacklistAcc.push(token);
        fs.writeFileSync("./blacklist.json",JSON.stringify(token));
        res.send({"mssg":"logout successfull"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
route.post("/signup",async(req,res)=>{
    try {
        let {name,email,pass,role}=req.body;
            bcrypt.hash(pass,6,async(err,hash)=>{
                if(err){
                    console.log(err);
                }else{
                    let userdata=new Usermodel({name,email,pass:hash,role});
                    await userdata.save();
                    res.send({"msg":"You have been sign up"})
                }
            })
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})

route.post("/login",async(req,res)=>{
    try {
        let {email,pass}=req.body;
        let data=await Usermodel.find({email})
        bcrypt.compare(pass,data[0].pass,(err,result)=>{
            if(err){
                res.end({"msg":"wrong password"})
            }else{
                let dataid=data[0]._id;
                let role=data[0].role
              let token=  jwt.sign({dataid,role},process.env.secretkey,{expiresIn:60});
              let refresh=jwt.sign({dataid,role},process.env.refreshkey,{expiresIn:300});
              res.send({"msg":"Login succesful",token,refresh})
            }
        })
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})



module.exports={
route
};
