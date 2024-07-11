import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const productRef = ref(database, 'products/' + productId);
    onValue(productRef, (snapshot) => {
        const productDetails = snapshot.val();
        document.getElementById('productDetails').innerHTML = `
            <h3>${productDetails.name}</h3>
            <p>${productDetails.description}</p>
            <p>Price: $${productDetails.price}</p>
            <p>Category: ${productDetails.category}</p>
            <img src="${productDetails.image}" alt="${productDetails.name}">
        `;
    });
}

window.addToCart = function addToCart() {
    alert("Add to Cart functionality is not implemented yet.");
}

if (document.getElementById('productDetails')) loadProductDetails();
