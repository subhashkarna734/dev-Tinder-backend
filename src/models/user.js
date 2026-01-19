const  mongoose= require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken'); 

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        lowercase: true,
        trim: true,
        index:true
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
        enum:{
            values : ['Male', 'Female', 'Others'],
            message: `{VALUE} is not the valid gender type.`
        }
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
    },
    photoUrl:{
        type: String,
        default:"https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg",
        validat(value){
            if(!validator.isURL(value)){throw new Error('Invalid Photo url: ' +value)}
        }
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

