import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const database = getDatabase();

function loadProducts() {
    const productQuery = ref(database, 'products');
    onValue(productQuery, (snapshot) => {
        const products = [];
        snapshot.forEach((childSnapshot) => {
            const product = childSnapshot.val();
            product.id = childSnapshot.key;
            products.push(product);
        });
        document.getElementById('productList').innerHTML = products.map(createProductCard).join('');
    });
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        </div>
    `;
}

if (document.getElementById('productList')) loadProducts();
