const mongoose = require('mongoose');




const groupSchema = mongoose.Schema({
    users:[{type: mongoose.Schema.Types.ObjectId,ref:'users'}],
    groupName: String,
    groupImg:String
})




module.exports = mongoose.model('group',groupSchema)