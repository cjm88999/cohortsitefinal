import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadDashboard() {
    const user = auth.currentUser;
    if (user) {
        const dashboardRef = ref(database, 'dashboard/' + user.uid);
        onValue(dashboardRef, (snapshot) => {
            const dashboardItems = [];
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                dashboardItems.push(item);
            });
            document.getElementById('dashboardContent').innerHTML = dashboardItems.map(createDashboardCard).join('');
        });
    }
}

function createDashboardCard(item) {
    return `
        <div class="dashboard-content-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `;
}

if (document.getElementById('dashboardContent')) loadDashboard();
