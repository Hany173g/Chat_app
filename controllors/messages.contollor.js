

const Messages = require('../models/message')

const Chat = require('../models/Chat');






const getChat = async(chatId) => {
      try {
     
     
       

        let chat = await Chat.findById(chatId).populate('users')
        return chat; 
        } catch (err)
        {
            console.log(err)
        }
}



exports.getMessages = async(req,res) => {
    try {
     
        let chatId = req.params.id;
 

       let messages = await Messages.find({ chat: chatId }, null, { sort: { timestamp: -1 } })
    .populate({
        path: "chat",
        populate: {
        path: "users",
        model: "users",
        select: "username image"
        }
    })
     let Data = await getChat(chatId);
    if (messages.length == 0) {
       
     
     
            let friendData = Data.users.find(u => !u._id.equals(req.session.userId));
          
            res.render('Chat',{
            pageTitle: friendData.username,
            isUser: req.session.userId,
            friendRequests: req.friendsRequest,
            messages: messages,
            friendData: friendData,
            chatId: chatId
            }
            )
    }
    else
    {
    let friendData = messages[0].chat.users.find( user => user._id !== req.session.userId);
      let friendData2 = Data.users.find(u => !u._id.equals(req.session.userId));
    res.render('Chat',{
    pageTitle: friendData.name,
    isUser: req.session.userId,
     friendRequests: req.friendsRequest,
    messages: messages,
    friendData: friendData2,

    chatId: chatId
    }
    )
    }
   
  
    }catch(err)
    {
        console.log("Error",err)
    }
}


exports.newMessage = async(msg) => {
    try{
        msg.timestamp = Date.now();
        let newMsg = new Messages(msg);
        await newMsg.save();
    }catch(err)
    {
        console.log(err)
    }
}