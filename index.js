import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'block';
        document.getElementById('nav-profile').style.display = 'block';
    } else {
        document.getElementById('nav-login').style.display = 'block';
        document.getElementById('nav-signup').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'none';
        document.getElementById('nav-profile').style.display = 'none';
    }
});

function loadFeatures() {
    const featuresRef = ref(database, 'features');
    onValue(featuresRef, (snapshot) => {
        const features = [];
        snapshot.forEach((childSnapshot) => {
            const feature = childSnapshot.val();
            features.push(feature);
        });
        document.getElementById('featureList').innerHTML = features.map(createFeatureListItem).join('');
    });
}

function createFeatureListItem(feature) {
    return `
        <div class="feature-list-item">
            <img src="${feature.icon}" alt="${feature.name}">
            <h3>${feature.name}</h3>
            <p>${feature.description}</p>
        </div>
    `;
}

if (document.getElementById('featureList')) loadFeatures();
