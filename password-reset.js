import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const auth = getAuth();

window.resetPassword = function resetPassword() {
    const email = document.getElementById('email').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
