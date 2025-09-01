const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    image:{type:String,default:"default-user-image.png"},
    isOnline:{type:Boolean,default: false},
    friends:{
        type: [{name:String,image:String,id:String,chatId:String}],
        default: []
    },
    friendsRequests:{
        type:[{name:String,id:String}],
        default:[]
    },
    sentRequests:{
        type: [{name:String,id:String}],
        default: []
    }

});


module.exports = mongoose.model('users',userSchema)