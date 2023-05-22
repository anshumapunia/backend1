const mongoose = require("mongoose")
const userSchema=mongoose.Schema({
    name:"String",
    email:"String",
    Pass:"String",
    role:"String",
   

})

const Usermodel = mongoose.model("userdata",UserSchema);
module.exports={
    Usermodel
}