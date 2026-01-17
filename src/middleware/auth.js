const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const auth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error('Invalid token');
        }
        const decodedObj = jwt.verify(token,'SECREATKEY@(12#)');
        console.log('decodedObj',decodedObj);
        const { _id } = decodedObj;
        if(!_id){
            throw new Error('User not found');
        }
        const user = await User.findById({_id:_id});
        console.log('user',user);
        req.user = user;
        next();
    }catch(err){
        res.status(400).send('Err: ' +err.message);
    }

}

module.exports = {
    auth
}
