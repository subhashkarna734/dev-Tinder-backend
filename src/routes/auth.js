const express = require('express');
const {User} = require('../models/user');
const {validatorSignup} = require('../utils/validation');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {auth} = require('../middleware/auth.js');
const { token } = require('morgan');
const authrouter = express.Router();

//===============Signup======================//
authrouter.post('/user/signup',async (req,res)=>{
  try{
    // validatorSignup(req.body);
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash =await bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash
    })
   await user.save();
   res.status(200).json({ message: 'User created successfully' });
  }catch(err){
      console.error(err.message);
      res.status(500).send('soemthing went wrong');
  }
});

//===============Login======================//
authrouter.post('/user/login',async (req,res)=>{
  try{
    const {emailId,password} = req.body;
    const user =await User.findOne({emailId:emailId});
    if(!user){
        throw new Error('Invalid Credentials!')
    }
    const isSuccess = await bcrypt.compare(password,user.password);
    if(isSuccess){
        let token = jsonwebtoken.sign({_id:user._id},'SECREATKEY@(12#)', {expiresIn:'1h'});
        res.cookie('token',token)
        res.status(200).send('User login successfully');
    }else{
        throw new Error('Invalid Credentials!')
    }
  }catch(err){
      console.error(err.message);
      res.status(500).send('Invalid Credentials!');
  }
})

//===============Logout======================//
authrouter.post('/user/logout',(req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now())});
    res.send('user has logged out');    
})

module.exports = authrouter;

