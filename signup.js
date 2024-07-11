import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

window.signUp = function signUp() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const profession = document.getElementById('profession').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                profession: profession,
                city: city,
                state: state,
                profilePicture: "default-profile-picture-url",
                bio: ""
            }).then(() => {
                alert("Sign up successful!");
                window.location.href = 'profile.html';
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
