const authorize=(role_arr)=>{
    return (req,res,next)=>{
       let role=req.body.role;
       if(role_arr.includes(role)){
          next()
       }else{
          res.send({"msg":"you are not authorized"})
       }
    }
 };
 
 module.exports={
 authorize
 }