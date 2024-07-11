import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadChats() {
    const user = auth.currentUser;
    if (user) {
        const chatsRef = ref(database, 'chats/' + user.uid);
        onValue(chatsRef, (snapshot) => {
            const chats = [];
            snapshot.forEach((childSnapshot) => {
                const chat = childSnapshot.val();
                chats.push(chat);
            });
            document.getElementById('chatList').innerHTML = chats.map(createChatCard).join('');
        });
    }
}

function createChatCard(chat) {
    return `
        <div class="chat-card">
            <img src="${chat.picture}" alt="${chat.name}" class="chat-picture">
            <h3>${chat.name}</h3>
            <p>${chat.lastMessage}</p>
            <button onclick="openChat('${chat.id}')">Open Chat</button>
        </div>
    `;
}

window.newChat = function newChat() {
    window.location.href = 'new-chat.html';
}

window.openChat = function openChat(chatId) {
    window.location.href = 'chat.html?id=' + chatId;
}

if (document.getElementById('chatList')) loadChats();
