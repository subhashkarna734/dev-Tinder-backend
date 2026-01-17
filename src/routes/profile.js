const express = require('express');
const {auth} = require('../middleware/auth.js');
const {User} = require('../models/user');
const {validateEditFields} = require('../utils/validation');

const profileRouter = express.Router();

//===============getuserProfile======================//
profileRouter.get('/profile/getuserProfile', auth, async (req,res)=>{
    try{ 
        res.status(200).send(req.user);
    }catch(err){
        res.status(400).send('Error: ' + err.message);
    }
})

//===============feed======================//
profileRouter.get('/profile/feed',auth,async(req,res)=>{
 try{
    const UserProfile = await User.find({});
    UserProfile.length === 0 ?res.status(400).send('User not found') : res.status(200).send(UserProfile);
    }catch(err){
        res.status(400).send('something went wrong');
    }
})

//===============Edit User API======================//
profileRouter.patch('/profile/edit', auth, async(req,res)=>{
 try{
    if(!validateEditFields(req)){
        throw new Error('Edit request not valid');
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key)=>{ loggedInUser[key] = req.body[key]
    })
    await loggedInUser.save()
    res.json({message: `hey ${req.user.firstName}  your prfile has been updated` , data:loggedInUser})
    }catch(err){
        res.status(400).send('ERR: ' +err.message);
    }
})

module.exports =  profileRouter;
