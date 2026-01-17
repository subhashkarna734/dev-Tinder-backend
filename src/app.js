const express = require('express');
const {connectDB}  = require('./config/database');
const cookiesParser = require('cookie-parser');
var morgan = require('morgan')
const app = express();

var logger = morgan('combined')

app.use(express.json());
app.use(cookiesParser());
connectDB().then(()=>{
    console.log('DB connected');
    app.listen(3000,()=>{
    console.log('server is listening on port:3000')
})
}).catch((err)=>{
    console.log(err.message);
})

const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js')
const updateRouter = require('./routes/update.js')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', updateRouter);


