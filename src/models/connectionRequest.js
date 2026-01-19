const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ['ignore' ,'accept', 'reject', 'interested'],
            message:`{VALUE} is not supported`
        },
    }
},
    {
       timestamps:true  
    }
)
connectionRequestSchema.index({fromUserId:1,toUserId:1});
const ConnectionRequest = mongoose.model("connectionRequest", connectionRequestSchema)
module.exports = {
   ConnectionRequest
}