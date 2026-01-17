const validator = require('validator');
const validatorSignup = ()=>{
    if(!firstName || !lastName){
        throw new Error('First Name not valid');
    }else if(!emailId){
        validator.isEmail(emailId)
    }
}
const validateEditFields =(req)=>{
    const allowedEditcolumn = ['lastName'];
    const isEditedAllowed = Object.keys(req.body).every(fields =>{
         return allowedEditcolumn.includes(fields);
    })
    return isEditedAllowed;
}

module.exports = {
    validatorSignup,
    validateEditFields
}