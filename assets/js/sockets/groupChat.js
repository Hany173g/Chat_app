

let sendBtn = document.getElementById('sendBtn');
let groupId = document.getElementById('groupId').value;
let message = document.getElementById('message')

let msgContainer = document.getElementById('messages-container');

socket.on('connect',() => {
    socket.emit('joinGroupChat',groupId)
})


sendBtn.onclick = () => {
     let msg = message.value
    socket.emit('sendNewMsg',{msg,groupId})
}





socket.on('newMsgSent', (message) => {

   let msg = message
    msgContainer.innerHTML += msg;
    msgContainer.innerHTML += `<br>`
})