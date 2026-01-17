const mongoose = require('mongoose');
const connectDB = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/sample');
}

module.exports = {
    connectDB
}




