import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadUserProfile() {
    const user = auth.currentUser;
    if (user) {
        const profileRef = ref(database, 'users/' + user.uid);
        onValue(profileRef, (snapshot) => {
            const profile = snapshot.val();
            document.getElementById('profileDetails').innerHTML = `
                <img src="${profile.profilePicture}" alt="Profile Picture" class="profile-picture">
                <h3>${profile.fullName}</h3>
                <p>${profile.bio}</p>
                <p>${profile.email}</p>
                <p>${profile.location}</p>
            `;
        });
    }
}

window.editProfile = function editProfile() {
    window.location.href = 'edit-profile.html';
}

if (document.getElementById('profileDetails')) loadUserProfile();
