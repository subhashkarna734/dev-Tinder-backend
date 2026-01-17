const express = require('express');
const {auth} = require('../middleware/auth.js');
const updateRouter = express.Router();

//===============getuserProfile======================//
updateRouter.delete('/update/delete',auth,async(req,res)=>{
 try{
    const userId = req.user;
    await User.findByIdAndDelete(userId);
    res.status(200).send('user deleted successfully')
    }catch(err){
        res.status(400).send('something went wrong');
    }
})

//===============updataData======================//
updateRouter.put('/update/updataData',auth, async(req,res)=>{
 try{
    const {firstName,lastName,age,gender,emailId} = req.body;
    const {userId} = req.user
    await User.findByIdAndUpdate(userId,{firstName,lastName,age,gender,emailId});
    res.status(200).send('user updated successfully')
    }catch(err){
        res.status(400).send('something went wrong');
    }
})

//===============update======================//
updateRouter.patch('/update/update',async(req,res)=>{
 try{
    const userId = req.user;
    console.log(userId);
    await User.findByIdAndUpdate(userId,{firstName:'Ravindra singh'});
    res.status(200).send('user updated successfully')
    }catch(err){
        res.status(400).send('something went wrong');
    }
})

module.exports = updateRouter;