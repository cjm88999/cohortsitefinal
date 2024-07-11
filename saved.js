import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadSavedItems() {
    const user = auth.currentUser;
    if (user) {
        const savedRef = ref(database, 'saved/' + user.uid);
        onValue(savedRef, (snapshot) => {
            const savedItems = [];
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                savedItems.push(item);
            });
            document.getElementById('savedItemsList').innerHTML = savedItems.map(createSavedItemCard).join('');
        });
    }
}

function createSavedItemCard(item) {
    return `
        <div class="saved-item-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button onclick="removeSavedItem('${item.id}')">Remove</button>
        </div>
    `;
}

window.removeSavedItem = function removeSavedItem(itemId) {
    const user = auth.currentUser;
    if (user) {
        const savedRef = ref(database, 'saved/' + user.uid + '/' + itemId);
        remove(savedRef).then(() => {
            alert("Item removed from saved items!");
            loadSavedItems(); // Refresh the list
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

if (document.getElementById('savedItemsList')) loadSavedItems();
