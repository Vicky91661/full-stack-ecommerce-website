import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import config from "../config/index"

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


//ecrypt password hooks
userSchema.pre("save",async function(next){
    if(!this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password,10) // 10 rounds
    next()
})

//add more features directly to your schema

userSchema.methods = {
    //compare password
    comparePassword:async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    },

    // generate JWT Token
    getJwtToken:function(){
        return JWT.sign({
            _id:this._id,
            role:this.role
            },
            config.JWT_SECRET,
            {
            expiresIn:config.JWT_EXPIRY
            }
        )
    }
}

export default mongoose.model("User",userSchema)