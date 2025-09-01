let btn = document.getElementById('createGroup')
    // عنصر الـ Bootstrap alert
const friendsD = document.getElementById('friends').value;
const friends = JSON.parse(friendsD);
const groups = document.getElementById('groups');
let checkbox;
let createBtn;
let nameGroup;

btn.onclick = () => {
    btn.remove()
    let html = `<input id="nameGroup" type="text"><br>`;
for (let friend of friends) {
    html += `
    <div class="d-flex flex-column gap-2">
        <label class="d-flex align-items-center gap-2">
          <input type="checkbox" class="userCheckBox" name="users" value="${friend._id}">
        
            <img src="/default-user-image.png" class="rounded-circle" width="30" height="30" alt="صورة">
            <span>${friend.name}</span>
        </label>
    </div>`;
}
html += `<button id="createBtn" class="btn btn-primary" style="padding-left:0.25rem;padding-right:0.25rem;">Create</button>`;

groups.innerHTML = html;

 checkbox = document.querySelectorAll(".userCheckBox");

 createBtn = document.getElementById('createBtn')
 nameGroup = document.getElementById('nameGroup')



createBtn.onclick = () => {
   let friendsID = Array.from(checkbox).map(cb => cb.value);
    socket.emit('createGroup',{friendsId:friendsID, nameGroup:  nameGroup.value,userId: id})
}

}











