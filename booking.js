import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadBookings() {
    const user = auth.currentUser;
    if (user) {
        const bookingsRef = ref(database, 'bookings/' + user.uid);
        onValue(bookingsRef, (snapshot) => {
            const bookings = [];
            snapshot.forEach((childSnapshot) => {
                const booking = childSnapshot.val();
                bookings.push(booking);
            });
            document.getElementById('bookingList').innerHTML = bookings.map(createBookingCard).join('');
        });
    }
}

function createBookingCard(booking) {
    return `
        <div class="booking-card">
            <img src="${booking.serviceImage}" alt="${booking.serviceName}">
            <h3>${booking.serviceName}</h3>
            <p>${booking.bookingDate}</p>
            <p>${booking.bookingTime}</p>
            <p>${booking.specialRequirements}</p>
        </div>
    `;
}

if (document.getElementById('bookingList')) loadBookings();
