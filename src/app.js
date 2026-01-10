const express = require('express');

const app = express();

app.use('/getProfile',(req,res)=>{
   res.send('Respnse from server!')
})

app.use('/getProfiles',(req,res)=>{
   res.send('Respnse from server getprofile!')
})

app.listen(3000,()=>{
    console.log('server is listening on port:3000')
})