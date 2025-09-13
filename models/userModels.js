import mongoose from "mongoose";
import  validator  from "validator";
const user=new mongoose.Schema({
   name:{
        type:String,
        required:[true,"Name is required"],
        maxLenght:[30,'Name should be maximum 30 characters'],
        minLength:[3,"Name should be minimum 3 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter your Eamil"],
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[8,"Password should be at least 8 characters"],
        select:false

    }
})

const User=mongoose.model("User",user)
export default User