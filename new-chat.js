import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadUsers() {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            user.id = childSnapshot.key;
            users.push(user);
        });
        const userSelect = document.getElementById('chat-user');
        userSelect.innerHTML = users.map(createUserOption).join('');
    });
}

function createUserOption(user) {
    return `<option value="${user.id}">${user.fullName}</option>`;
}

window.createChat = function createChat() {
    const user = auth.currentUser;
    if (user) {
        const selectedUserId = document.getElementById('chat-user').value;
        const chatRef = push(ref(database, 'chats/' + user.uid));
        set(chatRef, {
            id: chatRef.key,
            userId: selectedUserId,
            lastMessage: '',
            timestamp: Date.now()
        }).then(() => {
            alert("Chat created successfully!");
            window.location.href = 'chats.html';
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

if (document.getElementById('newChatForm')) loadUsers();
