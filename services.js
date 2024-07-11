import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadServices() {
    const serviceQuery = ref(database, 'services');
    onValue(serviceQuery, (snapshot) => {
        const services = [];
        snapshot.forEach((childSnapshot) => {
            const service = childSnapshot.val();
            service.id = childSnapshot.key;
            services.push(service);
        });
        document.getElementById('serviceList').innerHTML = services.map(createServiceCard).join('');
    });
}

function createServiceCard(service) {
    return `
        <div class="service-card">
            <img src="${service.image}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>$${service.price}</p>
        </div>
    `;
}

if (document.getElementById('serviceList')) loadServices();
