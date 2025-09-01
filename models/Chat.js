const mongoose = require('mongoose');




const messageSchema = mongoose.Schema({
    users:[{type: mongoose.Schema.Types.ObjectId,ref:'users'}],
})




module.exports = mongoose.model('chat',messageSchema)