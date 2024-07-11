import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUVIF0kx4RfF9UtELQmCUTaj2EoSZzj90",
    authDomain: "fir-cohort-5a6d3.firebaseapp.com",
    databaseURL: "https://fir-cohort-5a6d3-default-rtdb.firebaseio.com",
    projectId: "fir-cohort-5a6d3",
    storageBucket: "fir-cohort-5a6d3.appspot.com",
    messagingSenderId: "184607382290",
    appId: "1:184607382290:web:cf2244ba9badaa2d1df1cb",
    measurementId: "G-2DKJZ85PMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

window.signUp = function signUp() {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                email: email,
                userId: user.uid
            });
            alert("User signed up successfully!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

window.logIn = function logIn() {
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User logged in successfully!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

window.saveProfile = function saveProfile() {
    const fullName = document.getElementById('fullName').value;
    const bio = document.getElementById('bio').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;

    const user = auth.currentUser;

    if (user) {
        update(ref(database, 'users/' + user.uid), {
            fullName: fullName,
            bio: bio,
            email: email,
            location: location
        }).then(() => {
            alert("Profile updated successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    } else {
        alert("No user is signed in.");
    }
}

window.saveSettings = function saveSettings() {
    const notificationPreferences = document.getElementById('notificationPreferences').value;
    const privacySettings = document.getElementById('privacySettings').value;
    const accountSettings = document.getElementById('accountSettings').value;

    const user = auth.currentUser;

    if (user) {
        update(ref(database, 'users/' + user.uid), {
            notificationPreferences: notificationPreferences,
            privacySettings: privacySettings,
            accountSettings: accountSettings
        }).then(() => {
            alert("Settings updated successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    } else {
        alert("No user is signed in.");
    }
}
