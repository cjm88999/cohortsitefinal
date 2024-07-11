import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadServiceDetails() {
    const user = auth.currentUser;
    if (user) {
        const serviceRef = ref(database, 'bookings/' + user.uid);
        onValue(serviceRef, (snapshot) => {
            const serviceDetails = snapshot.val();
            document.getElementById('serviceDetails').innerHTML = `
                <h3>Service Name: ${serviceDetails.serviceName}</h3>
                <p>Booking Date: ${serviceDetails.bookingDate}</p>
                <p>Booking Time: ${serviceDetails.bookingTime}</p>
                <p>Special Requirements: ${serviceDetails.specialRequirements}</p>
            `;
        });
    }
}

window.returnToHome = function returnToHome() {
    window.location.href = 'index.html';
}

if (document.getElementById('serviceDetails')) loadServiceDetails();
