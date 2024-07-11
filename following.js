import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadFollowing() {
    const user = auth.currentUser;
    if (user) {
        const followingRef = ref(database, 'following/' + user.uid);
        onValue(followingRef, (snapshot) => {
            const following = [];
            snapshot.forEach((childSnapshot) => {
                const followed = childSnapshot.val();
                following.push(followed);
            });
            document.getElementById('followingList').innerHTML = following.map(createFollowingCard).join('');
        });
    }
}

function createFollowingCard(followed) {
    return `
        <div class="following-card">
            <img src="${followed.profilePicture}" alt="${followed.fullName}">
            <h3>${followed.fullName}</h3>
            <button onclick="messageUser('${followed.id}')">Message</button>
        </div>
    `;
}

window.messageUser = function messageUser(userId) {
    alert("Message functionality is not implemented yet.");
}

if (document.getElementById('followingList')) loadFollowing();
