import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadCart() {
    const user = auth.currentUser;
    if (user) {
        const cartRef = ref(database, 'cart/' + user.uid);
        onValue(cartRef, (snapshot) => {
            const cartItems = [];
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                cartItems.push(item);
            });
            document.getElementById('cartList').innerHTML = cartItems.map(createCartItem).join('');
        });
    }
}

function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `;
}

window.removeFromCart = function removeFromCart(itemId) {
    const user = auth.currentUser;
    if (user) {
        const itemRef = ref(database, 'cart/' + user.uid + '/' + itemId);
        remove(itemRef).then(() => {
            alert("Item removed from cart!");
            loadCart(); // Refresh the list
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

if (document.getElementById('cartList')) loadCart();
