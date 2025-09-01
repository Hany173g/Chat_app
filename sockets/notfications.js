





module.exports = io => {

    
   io.on('connection',socket => {
    socket.on('joinNotficationRoom', id => {
        socket.join(id)
    });
    socket.on('joinFriendNotfication', (id)=> {
        
    })
    socket.on('goOnline', id => {
        io.OnlineUsers[id] = true;
        
        socket.on('disconnect', () => {
            io.OnlineUsers[id] = false;
        })
    })
    
   })
}