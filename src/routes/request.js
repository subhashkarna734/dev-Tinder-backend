const express = require('express');
const {auth} = require('../middleware/auth.js');
const {ConnectionRequest} = require('../models/connectionRequest.js');
const {User} = require('../models/user');
const requestRouter = express.Router();

//==============Send Connection Request either ignore or interested=============//
requestRouter.post('/request/send/:status/:toUserId',auth, async (req,res)=>{
  try{
    const user = req.user;
    const fromUserId = user._id;
    const {toUserId, status} = req.params;
    const allowedStatus = ['ignore', 'interested'];
    //staus ignore and interest while send the connection request
    if(!allowedStatus.includes(status)){
       return res.status(400).json({
        error: `Invalid status. Allowed values are: ${allowedStatus.join(', ')}`
      });
    }
    //Check existing connection from sender to receiver
    const isAlreadySentRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId, status: 'interested'},
        {fromUserId:toUserId, toUserId:fromUserId, status: 'interested'},
      ] 
    })
    if(isAlreadySentRequest){
        return res.status(400).json({
        error: `Connection request already exist!!`
      });
    }
    //check user exist of not to sending the request to someone else which is not avaialable in the database.
    const existUser = await User.findById(toUserId);
    if (!existUser) {
      return res.status(400).json({
        error: 'User not found to whom you are sending the request'
      });
    }
    //Don't able to send the connection request to myself
    if(fromUserId.toString() === toUserId){
       return res.status(400).json({
        error: 'You are trying to send the request to youself'
      });
    }
    connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })
   const data = await connectionRequest.save();
   res.json({
    message: 'connection sent successfully',
    data
   })
  }catch(err){
      res.status(404).send('Error: ' +err.message);
  }
});


//==============Receive Connection Request either accept or reject=============//
requestRouter.post('/request/review/:status/:requestedId',auth, async (req,res)=>{
  try{
    const user = req.user;
    const fromUserId = user._id;
    const {requestedId, status} = req.params;
    const allowedStatus = ['accept', 'reject'];
      
    //staus accept and reject while send the connection request
    if(!allowedStatus.includes(status)){
       return res.status(400).json({
        error: `Invalid status. Allowed values are: ${allowedStatus.join(', ')}`
      });
    }

    //when user already accepet the connection or reject the connection
    const isAccepetedOrRejected = await ConnectionRequest.findOne({
      fromUserId: requestedId,
      toUserId: fromUserId,
       status: { $in: ['accept', 'reject'] }
    });
    if(isAccepetedOrRejected){
      return res.status(400).json({
        error: `InValid request!`
      });
    }
    //check user 
    const checkRequestSendByYou = await ConnectionRequest.findOne({
      fromUserId,
      toUserId: requestedId,
       status: { $in: ['interested', 'ignore'] }
    });
    if(checkRequestSendByYou){
      return res.status(400).json({
        error:`InValid request!`
      });
    }

    //check user exist or not for review.
    const existUser = await User.findById(requestedId);
    if (!existUser) {
      return res.status(400).json({
        error: `InValid request!`
      });
    }
    //Don't able to send the connection request to myself
    if(fromUserId.toString() === requestedId){
       return res.status(400).json({
        error: `InValid request!`
      });
    }
  const data = await ConnectionRequest.findOneAndUpdate(
    {
      fromUserId: requestedId,
      toUserId: fromUserId,
      status: 'interested'
    },
    { $set: { status } },
    { new: true }
  );
   res.json({
    message: `connection ${status} successfully`,
    data
   })
  }catch(err){
      res.status(404).send('Error: ' +err.message);
  }
});

module.exports = requestRouter;
