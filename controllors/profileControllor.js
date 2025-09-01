
const User = require('../models/User');

exports.redirect = (req,res,next) => {
    res.redirect('/profile/' + req.session.userId);
};




exports.getProfile = async (req,res,next) => {
    try {

        let id  = req.params.id;
        const userData = await User.findOne({_id:id});
        let myData = await User.findOne({_id:req.session.userId});
       
       if (!userData)
       {
        res.send("Sorry User Not Found")
       }
         let userId = req.session.userId.toString();
       let isFriendsRequest = userData.friendsRequests.find(friendsRequest => friendsRequest.id === userId);
       
       
      
     
        res.render('profile',{
            pageTitle:userData.username,
            isUser:req.session.userId,
            username: userData.username,
            userImage: userData.image,
            myImage: myData.image,
            myId: myData._id,
            friendID: userData._id,
            myName:myData.username,
            userId:userData.id,
            friendRequests: req.friendsRequest,
            isOwner: id===userId,
            isFriends: userData.friends.find(friend => friend.id === userId),
            isFriendsRequest:isFriendsRequest,
            sentRequest: userData.sentRequests.find(sentRequest => sentRequest.id === userId),
            
        })
    } catch(err)
    {
        console.log(err)
    }
}






