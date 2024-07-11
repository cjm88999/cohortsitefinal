import { getAuth, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const auth = getAuth();

window.updateSettings = function updateSettings() {
    const user = auth.currentUser;
    if (user) {
        const newEmail = document.getElementById('email').value;
        const newPassword = document.getElementById('password').value;

        updateEmail(user, newEmail).then(() => {
            return updatePassword(user, newPassword);
        }).then(() => {
            alert("Settings updated successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}
