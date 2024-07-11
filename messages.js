import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadMessages() {
    const user = auth.currentUser;
    if (user) {
        const messagesRef = ref(database, 'messages/' + user.uid);
        onValue(messagesRef, (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                messages.push(message);
            });
            document.getElementById('messagesList').innerHTML = messages.map(createMessageCard).join('');
        });
    }
}

function createMessageCard(message) {
    return `
        <div class="message-card">
            <h3>${message.senderName}</h3>
            <p>${message.text}</p>
            <span>${new Date(message.timestamp).toLocaleString()}</span>
        </div>
    `;
}

window.startNewChat = function startNewChat() {
    alert("Start new chat functionality is not implemented yet.");
}

if (document.getElementById('messagesList')) loadMessages();
