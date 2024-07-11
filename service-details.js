import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadServiceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    const serviceRef = ref(database, 'services/' + serviceId);
    onValue(serviceRef, (snapshot) => {
        const serviceDetails = snapshot.val();
        document.getElementById('serviceDetails').innerHTML = `
            <h3>${serviceDetails.name}</h3>
            <p>${serviceDetails.description}</p>
            <p>Price: $${serviceDetails.price}</p>
            <p>Category: ${serviceDetails.category}</p>
            <img src="${serviceDetails.image}" alt="${serviceDetails.name}">
        `;
    });
}

window.bookService = function bookService() {
    alert("Book Service functionality is not implemented yet.");
}

if (document.getElementById('serviceDetails')) loadServiceDetails();
