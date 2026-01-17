const express = require('express');
const {auth} = require('../middleware/auth.js');
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

module.exports =  profileRouter;
