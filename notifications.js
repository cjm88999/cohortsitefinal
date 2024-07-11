import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadNotifications() {
    const user = auth.currentUser;
    if (user) {
        const notificationsRef = ref(database, 'notifications/' + user.uid);
        onValue(notificationsRef, (snapshot) => {
            const notifications = [];
            snapshot.forEach((childSnapshot) => {
                const notification = childSnapshot.val();
                notifications.push(notification);
            });
            document.getElementById('notificationList').innerHTML = notifications.map(createNotificationCard).join('');
        });
    }
}

function createNotificationCard(notification) {
    return `
        <div class="notification-card">
            <img src="${notification.icon}" alt="${notification.title}">
            <h3>${notification.title}</h3>
            <p>${notification.message}</p>
        </div>
    `;
}

if (document.getElementById('notificationList')) loadNotifications();
