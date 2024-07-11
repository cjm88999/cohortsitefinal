import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function saveProfile() {
    const fullName = document.getElementById('fullName').value;
    const bio = document.getElementById('bio').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;

    const user = auth.currentUser;
    if (user) {
        const profileRef = ref(database, 'users/' + user.uid);
        update(profileRef, {
            fullName: fullName,
            bio: bio,
            email: email,
            location: location
        }).then(() => {
            alert("Profile updated successfully!");
            window.location.href = 'profile.html';
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

window.saveProfile = saveProfile;
