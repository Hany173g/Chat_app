const Groups = require('../models/Groups')

const User = require('../models/User')


const getFriends = require('./friend.controlloers').getFriends

const myGroups = async(id) => {
    try {
        const allGroup = await Groups.find({users:id})
       
        return allGroup;
    }catch(err)
    {
        console.log(err)
    }
}
let myData;
exports.getGroups = async(req,res) => {
    try {

        let allGroups = await myGroups(req.session.userId)
        let Friends = await getFriends(req.session.userId);
         myData = await User.findById(req.session.userId);

        
        let allFriends = Friends.map(friend => ({
            name: friend.name,
        image: friend.image,
        id: friend.id,
        chatId: friend.chatId,
        _id: friend.id 
        }))
      
        
        res.render('groups', {
            isUser:req.session.userId,
            friendRequests: req.friendsRequest,
            groups: allGroups,
            friends:allFriends
        })  
    }catch(err)
    {
        console.log(err)
    }
}








exports.createGroup = async(data) => {
    try{
       
        data.friendsId.push(data.userId)
       
        let newGroup = await Groups({users:data.friendsId,groupName:data.nameGroup})
        await newGroup.save();
    }catch(err)
    {
        console.log(err)
    }
}



exports.getGroup = async(req,res) => {
    try{
        let groupId = req.params.id;
        let userGroup = await Groups.findById(groupId);
   
        let friendsGroup = userGroup.users.filter(friend => friend.toString() != req.session.userId);
      
        let friends=[];
        for (let friendGroup of friendsGroup){
              let friendsData = await User.findById(friendGroup);
              friends.push(friendsData)
        }
       

        res.render('groupChat', {
        isUser:req.session.userId,
        friendRequests: req.friendsRequest,
        friends: friends,
        group:userGroup
        })
    }catch(err)
    {
        console.log(err)
    }
}
