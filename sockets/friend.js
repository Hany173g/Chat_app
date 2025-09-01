
const sendFriendRequest = require('../controllors/friend.controlloers').sendFriendRequest
const getFriends = require('../controllors/friend.controlloers').getFriends

module.exports = (io,socket)=> {
    socket.on('sendFriendRequest', data => {
        sendFriendRequest(data).then(() => {
            
            socket.emit('requestSent');
            io.to(data.friendId).emit('newFriendRequest',{name:  data.myName,id:data.myId})
        }).catch(err => {
            socket.emit('requestFaild')
        })
    })
    socket.on('getOnlineFriends',myId => {
        getFriends(myId).then((friends) => {
            let onlineFriends = friends.filter(friend => io.OnlineUsers[friend.id])
            socket.emit('onlineFriends',onlineFriends)
        }).catch(err => {
            console.log(err)
        })
    })
}