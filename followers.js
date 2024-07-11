import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadFollowers() {
    const user = auth.currentUser;
    if (user) {
        const followersRef = ref(database, 'followers/' + user.uid);
        onValue(followersRef, (snapshot) => {
            const followers = [];
            snapshot.forEach((childSnapshot) => {
                const follower = childSnapshot.val();
                followers.push(follower);
            });
            document.getElementById('followersList').innerHTML = followers.map(createFollowerCard).join('');
        });
    }
}

function createFollowerCard(follower) {
    return `
        <div class="follower-card">
            <img src="${follower.profilePicture}" alt="${follower.fullName}">
            <h3>${follower.fullName}</h3>
            <button onclick="messageUser('${follower.id}')">Message</button>
        </div>
    `;
}

window.messageUser = function messageUser(userId) {
    alert("Message functionality is not implemented yet.");
}

if (document.getElementById('followersList')) loadFollowers();
