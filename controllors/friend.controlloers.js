const User = require('../models/User')




const Chat = require('../models/Chat')



exports.sendFriendRequest = async(data) => {
    try {
        await User.updateOne({_id:data.friendId},{$push: {friendsRequests:{name:data.myName,id:data.myId}}}) 
       await User.updateOne({_id:data.myId},{$push: {sentRequests:{name:data.friendName,id:data.friendId}}}) 
    }catch(err){
        console.log("cant add friend",err)
    }
}





exports.cancel = async(req,res,next) => {
     try{
       const data = req.body; 
       await User.updateOne({_id:data.friendId},{$pull: {friendsRequests:{id:data.myId}}}) 
       await User.updateOne({_id:data.myId},{$pull: {sentRequests:{id:data.friendId}}}) 
       res.redirect('/profile/'+data.friendId)
    }catch(err){
        console.log("cant add friend",err)
    }
}


exports.accept = async(req,res,next) => {
    try{
        const data = req.body;
        let newChat = new Chat({
            users: [data.myId,data.friendId]
        })
       let chat =  await newChat.save();
        
        await User.updateOne({_id:data.friendId},{$push:{friends:{name:data.myName,image: data.myImage,id:data.myId,chatId:chat._id}}})
        await User.updateOne({_id:data.myId},{$push:{friends:{name:data.friendName,image: data.friendImage,id:data.friendId,chatId: chat._id}}})
        
        await User.updateOne({_id:data.friendId},{$pull: {sentRequests:{id:data.myId}}}) 
        await User.updateOne({_id:data.myId},{$pull: {friendsRequests:{id:data.friendId}}}) 
        
        res.redirect('/profile/'+data.friendId)
    }catch (err)
    {
        console.log("cant accept this friend",err)
    }
}


exports.reject = async(req,res,next) => {
    try {
        const data = req.body;
          await User.updateOne({_id:data.friendId},{$pull: {sentRequests:{id:data.myId}}}) 
       await User.updateOne({_id:data.myId},{$pull: {friendsRequests:{id:data.friendId}}}) 
        res.redirect('/profile/' + data.friendId)
    }catch(err)
    {
        console.log("cant reject friend",err)
    }
}


exports.delete = async(req,res,next) => {
    try {
         const data = req.body;
        await User.updateOne({_id:data.friendId},{$pull : {friends: {id:data.myId}}});
        await User.updateOne({_id:data.myId},{$pull : {friends: {id:data.friendId}}});
        res.redirect('/profile/' + data.friendId)
    }catch (err)
    {
        console.log("cant delete friend",err)
    }
}






exports.getFriendRequests = async id => {
    try{
      let data =   await User.findById(id,{friendsRequests: true});
        
       return data.friendsRequests;
    }catch(err)
    {
        console.log("cant get friends request",err)
    }
}




exports.getFriends = async(id) => {
    try {
         let friends = await User.findById(id,{friends: true});
       
        return friends.friends;
    }catch(err)
    {
        console.log("cant get friends")
    }
}




exports.getAllFriends = async(req,res) => {
    const id = req.session.userId;
    let friends = await User.findById(id,{friends:true});
      // حوّل كل _id لأي صديق من ObjectId لـ string
    const friendsData = friends.friends.map(friend => ({
        name: friend.name,
        image: friend.image,
        id: friend.id,
        chatId: friend.chatId,
        _id: friend._id.toString()
    }));

    res.render('friends' , {
        friends: friendsData,
         isUser:req.session.userId,
        friendRequests: req.friendsRequest
    })
}





exports.getFriend = async(id) => {
    try{
        let friend = await User.findById(id);
        return friend;
    } catch(err)
    {
        console.log(err)
    }
}