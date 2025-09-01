


const createGroup = require('../controllors/groups.controllor').createGroup





module.exports = io => {
    io.on('connection', socket => {
        socket.on('createGroup', data => {
                
                createGroup(data).then(() => {});
                
        })
        socket.on('joinGroupChat', groupId => {
       
            socket.join(groupId)
        })
        socket.on('sendNewMsg', data => {
            console.log(data)
            io.to(data.groupId).emit('newMsgSent',data.msg)
        })
    })
}