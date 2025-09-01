const mongoose = require('mongoose');




const messageSchema = mongoose.Schema({
    chat: {type: mongoose.Schema.Types.ObjectId,ref:'chat'},
    content:String,
    sender:String,
    timestamp:Number
})



module.exports = mongoose.model('message',messageSchema)