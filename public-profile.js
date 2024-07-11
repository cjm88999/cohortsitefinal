import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const database = getDatabase();

function loadPublicProfileDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    const profileRef = ref(database, 'users/' + userId);
    onValue(profileRef, (snapshot) => {
        const profileDetails = snapshot.val();
        document.getElementById('publicProfileDetails').innerHTML = `
            <h3>${profileDetails.fullName}</h3>
            <p>${profileDetails.bio}</p>
            <p>${profileDetails.email}</p>
            <p>${profileDetails.location}</p>
            <img src="${profileDetails.profilePicture}" alt="Profile Picture" class="profile-picture">
        `;
    });
}

if (document.getElementById('publicProfileDetails')) loadPublicProfileDetails();
