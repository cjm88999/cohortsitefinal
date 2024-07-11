import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

function loadExplore() {
    const exploreRef = ref(database, 'explore');
    onValue(exploreRef, (snapshot) => {
        const exploreItems = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            exploreItems.push(item);
        });
        document.getElementById('exploreList').innerHTML = exploreItems.map(createExploreItem).join('');
    });
}

function createExploreItem(item) {
    return `
        <div class="explore-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `;
}

if (document.getElementById('exploreList')) loadExplore();
