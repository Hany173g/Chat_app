const socket = io();


    let id = document.getElementById('userId').value;

socket.on('connect',() => {
    console.log('conneted')
    socket.emit('joinNotficationRoom', id)
    socket.emit('goOnline',id);
})



socket.on('newFriendRequest',data => {
    let friendRequests = document.getElementById('friendRequests');
    let span = friendRequests.querySelector('span');
    let button = document.getElementById('button');
    
    if (span)
    {
        span.remove();
    }
    friendRequests.innerHTML += `
      <a class="dropdown-item" href="/profile/${data.id}">${data.name}</a>
    
    `
    if (button)
    {
        button.className = 'nav-link dropdown-toggle bg-danger text-white';
    }
    button.onclick = () => {
        button.className = 'nav-link dropdown-toggle'
    }
})




socket.on('newMsg',msg => {
  
 let friendRequests = document.getElementById('friendRequests');
    let span = friendRequests.querySelector('span');
    let button = document.getElementById('button');
    
    if (span)
    {
        span.remove();
    }
    friendRequests.innerHTML += `
      <a class="dropdown-item" href="/profile/${msg.sentTo._id}"> new Message From ${msg.sentTo.username}</a>
    
    `
    if (button)
    {
        button.className = 'nav-link dropdown-toggle bg-danger text-white';
    }
    button.onclick = () => {
        button.className = 'nav-link dropdown-toggle'
    }
})