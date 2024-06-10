import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles"

//define the user Schema . The data you want to store for the user. 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is require"],
        maxLength:[50,"Name must be less than 50"]
    },
    email:{
        type:String,
        require:[true,"Email is require"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"Email is require"],
        minLength:[5,"Password must be atleast 5 characters"],
        select:false
    },
    role:{
        type:String,
        enum:Object.values(AuthRoles),
        default:AuthRoles.USER
    },
    forgetPasswordToken:String,
    forgetPasswordExpiry:Date
},{
    timestamps:true
})

export default mongoose.model("User",userSchema)