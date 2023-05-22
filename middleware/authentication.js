require('dotenv').config();
const jwt=require("jsonwebtoken")
const fs=require("fs");
const authentication=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        let block=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
        if(block.includes(token)){
            res.send({"msg":"you have been blacklisted"})
        }else{
            let decoded=jwt.verify(token,process.env.secretkey);
            if(decoded){
                console.log(decoded)
                req.body.role=decoded.role;
                next()
            }
        }
    }else{
        res.send({"msg":"loginagain"})
    }
};
module.exports={
    authentication
}