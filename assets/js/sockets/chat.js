
const chatId = document.getElementById('chatId').value;
const msg = document.getElementById('message');
const sentBtn = document.getElementById('sentBtn');
const msgContainer = document.getElementById('messages-container');
const friendId = document.getElementById('friendId').value;
const callBtn = document.getElementById('callBtn')
socket.emit('joinChat',chatId)




sentBtn.onclick = ()=>{
    let content = msg.value;
    socket.emit('sendMessage',{
        content:content,
        friendId: friendId,
        chat: chatId,
        sender: id
    }, () => {
        msg.value = '';
    })
}

socket.on('newMessage',msg => {
    msgContainer.innerHTML += msg.content;
    msgContainer.innerHTML += `<br>`
})





let peer = new Peer()

let peerID = null;

peer.on('open' , id => {
    peerID = id;
})


callBtn.onclick =() =>  {
    socket.emit('requestPeerId',chatId)
}







socket.on('getPeerId',() => {
    socket.emit('sendPeerId',{
        chatId: chatId,
        peerID:peerID
    })
})


socket.on('recievePeerId',peerId => {
  
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
    let call =     peer.call(peerId,stream);
     call.on('stream',showAudioCall)
    }).catch(err => console.log(err))
})

peer.on('call', call => {
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        call.answer(stream);
        call.on('stream',showAudioCall)
    }).catch(err => console.log(err))
})

function showAudioCall(stream) {
    let audio = document.createElement('audio');
    audio.srcObject = stream;
    audio.autoplay = true;
    audio.controls = true; // يظهر زر التشغيل/الإيقاف
    document.body.append(audio);
}