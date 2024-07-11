import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadChatSettings() {
    const user = auth.currentUser;
    if (user) {
        const settingsRef = ref(database, 'chatSettings/' + user.uid);
        onValue(settingsRef, (snapshot) => {
            const settings = snapshot.val();
            if (settings) {
                document.getElementById('notification-sound').value = settings.notificationSound || 'default';
                document.getElementById('privacy-settings').value = settings.privacySettings || 'everyone';
                loadBlockedUsers(settings.blockedUsers || []);
            }
        });
    }
}

function loadBlockedUsers(blockedUsers) {
    const blockedUsersList = document.getElementById('blocked-users-list');
    blockedUsersList.innerHTML = '';
    blockedUsers.forEach(user => {
        blockedUsersList.innerHTML += createBlockedUserCard(user);
    });
}

function createBlockedUserCard(user) {
    return `
        <div>
            <img src="${user.profilePicture}" alt="${user.fullName}">
            <h3>${user.fullName}</h3>
            <button onclick="unblockUser('${user.id}')">Unblock</button>
        </div>
    `;
}

window.saveChatSettings = function saveChatSettings() {
    const user = auth.currentUser;
    if (user) {
        const settingsRef = ref(database, 'chatSettings/' + user.uid);
        update(settingsRef, {
            notificationSound: document.getElementById('notification-sound').value,
            privacySettings: document.getElementById('privacy-settings').value
        }).then(() => {
            alert('Settings saved successfully!');
        }).catch((error) => {
            alert('Error: ' + error.message);
        });
    }
}

window.unblockUser = function unblockUser(userId) {
    alert("Unblock functionality is not implemented yet.");
}

if (document.getElementById('chatSettingsForm')) loadChatSettings();
