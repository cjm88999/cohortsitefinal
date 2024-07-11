import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, updatePassword, updateEmail } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function saveSettings() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const privacy = document.getElementById('privacy').value;

    const user = auth.currentUser;
    if (user) {
        updateEmail(user, email).then(() => {
            updatePassword(user, password).then(() => {
                const userSettingsRef = ref(database, 'users/' + user.uid);
                update(userSettingsRef, {
                    email: email,
                    privacy: privacy
                }).then(() => {
                    alert("Settings updated successfully!");
                }).catch((error) => {
                    alert("Error updating settings: " + error.message);
                });
            }).catch((error) => {
                alert("Error updating password: " + error.message);
            });
        }).catch((error) => {
            alert("Error updating email: " + error.message);
        });
    }
}

window.saveSettings = saveSettings;
