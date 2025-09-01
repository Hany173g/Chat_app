const newMessage = require('../controllors/messages.contollor').newMessage
const getFriend = require('../controllors/friend.controlloers').getFriend
module.exports =  io => {
    io .on('connection',socket => {
        socket.on('joinChat', chatId => {
            socket.join(chatId)
        })
        socket.on('sendMessage', async (msg,cb) => {
            let friend = await getFriend(msg.sender);

            msg.sentTo=friend;
      
            newMessage(msg).then(() => {});
            io.to(msg.chat).emit('newMessage',msg);
            io.to(msg.friendId).emit('newMsg',msg)
            cb();
        })
        socket.on('requestPeerId',chatId => {
            socket.broadcast.to(chatId).emit('getPeerId')
        })
        socket.on('sendPeerId',data => {
            socket.broadcast.to(data.chatId).emit('recievePeerId',data.peerID)
        })
    })
}