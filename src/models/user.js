const  mongoose= require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken'); 

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        lowercase: true,
        trim: true
    },
    lastName:{
        type: String,
        lowercase: true,
        trim: true
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate:function (val){
            return validator.isEmail(val);
        }
       
    },
    password:{
        type: String,
        required:true
    }
    
},{
    timestamps:true    
    });
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id},'SECREATKEY@(12#)', {expiresIn:'1d'});
    return token;
}
const User = mongoose.model("User", userSchema);
module.exports = {
    User,
    userSchema
}

