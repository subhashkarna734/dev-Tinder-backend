const express = require('express');
const { auth } = require('../middleware/auth');
const userRouter = express.Router();
const {ConnectionRequest} = require('../models/connectionRequest.js');

//============User request==================//
userRouter.get('/user/request',auth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const data =await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:'interested'
        }).populate("fromUserId",['firstName','lastName'])
        res.json({
            message: 'All pending request fetch successfully',
            data
        })
    }catch(err){
      res.status(404).send('Error: ' +err.message);
    }
})

//============User connection==================//
userRouter.get('/user/connection',auth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const data =await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:'accept'
        }).populate("fromUserId",['firstName','lastName'])
        res.json({
            message: 'All connection fetch successfully',
            data
        })
    }catch(err){
      res.status(404).send('Error: ' +err.message);
    }
})

module.exports = userRouter;