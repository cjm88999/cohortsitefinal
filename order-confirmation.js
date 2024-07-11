import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadOrderDetails() {
    const user = auth.currentUser;
    if (user) {
        const orderRef = ref(database, 'orders/' + user.uid);
        onValue(orderRef, (snapshot) => {
            const orderDetails = snapshot.val();
            document.getElementById('orderDetails').innerHTML = `
                <h3>Order Number: ${orderDetails.orderNumber}</h3>
                <p>Items: ${orderDetails.items.map(item => item.name).join(', ')}</p>
                <p>Total Cost: $${orderDetails.totalCost}</p>
                <p>Delivery Date: ${orderDetails.deliveryDate}</p>
            `;
        });
    }
}

window.returnToHome = function returnToHome() {
    window.location.href = 'index.html';
}

if (document.getElementById('orderDetails')) loadOrderDetails();
