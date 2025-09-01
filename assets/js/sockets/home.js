socket.emit('getOnlineFriends', id);

socket.on('onlineFriends', onlineFriends => {
    let div = document.getElementById('onlineFriends');
    console.log(onlineFriends);

    if (!onlineFriends || onlineFriends.length === 0) {
        div.innerHTML = '<p class="alert alert-danger">لا يوجد أصدقاء متصلين</p>';
    } else {
        let html = '<div class="row g-3 mt-4">'; // mt-4 لإضافة مسافة أعلى

        for (let friend of onlineFriends) {
            html += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card text-center shadow" style="background-color: #007bff; color: white;">
                    <img src="/${friend.image}" class="card-img-top rounded-circle mx-auto mt-3" alt="${friend.name}" style="width: 100px; height: 100px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${friend.name}</h5>
                        <a href="/chat/${friend.chatId}" class="btn btn-success btn-sm">Chat</a>
                    </div>
                </div>
            </div>
            `;
        }

        html += '</div>';
        div.innerHTML = html;
    }
});
