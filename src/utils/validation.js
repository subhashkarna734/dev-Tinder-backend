const validator = require('validator');
const validatorSignup = ()=>{
    if(!firstName || !lastName){
        throw new Error('First Name not valid');
    }else if(!emailId){
        validator.isEmail(emailId)
    }
}

module.exports = {
    validatorSignup
}