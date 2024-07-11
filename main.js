import { getDatabase, ref, onValue, query, orderByChild, equalTo, update, push, set, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const database = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-profile').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
        loadUserProfile(user.uid);
    } else {
        document.getElementById('nav-login').style.display = 'block';
        document.getElementById('nav-signup').style.display = 'block';
        document.getElementById('nav-profile').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'none';
    }
});

window.signup = function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const fullName = document.getElementById('signup-fullname').value;
    const phoneNumber = document.getElementById('signup-phone').value;
    const profession = document.getElementById('signup-profession').value;
    const city = document.getElementById('signup-city').value;
    const state = document.getElementById('signup-state').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const profileRef = ref(database, 'users/' + user.uid);
            set(profileRef, {
                email: email,
                fullName: fullName,
                phoneNumber: phoneNumber,
                profession: profession,
                city: city,
                state: state,
                profilePicture: 'default-profile-pic.png',
                bio: '',
                location: city + ', ' + state
            }).then(() => {
                alert('Signup successful!');
                window.location.href = 'profile.html';
            });
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

window.login = function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'profile.html';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

window.logout = function logout() {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
}

function loadUserProfile(uid) {
    const profileRef = ref(database, 'users/' + uid);
    onValue(profileRef, (snapshot) => {
        const profile = snapshot.val();
        document.getElementById('profileDetails').innerHTML = `
            <img src="${profile.profilePicture}" alt="Profile Picture" class="profile-picture">
            <h3>${profile.fullName}</h3>
            <p>${profile.bio}</p>
            <p>${profile.email}</p>
            <p>${profile.location}</p>
        `;
    });
}

function createProductCard(product) {
    return `
        <div class="product-card" onclick="window.location.href='product-details.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        </div>
    `;
}

function createServiceCard(service) {
    return `
        <div class="service-card" onclick="window.location.href='service-details.html?id=${service.id}'">
            <img src="${service.image}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>$${service.price}</p>
        </div>
    `;
}

window.searchProducts = function searchProducts() {
    const searchQuery = document.getElementById('productSearch').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let productQuery = ref(database, 'products');
    if (categoryFilter) {
        productQuery = query(productQuery, orderByChild('category'), equalTo(categoryFilter));
    }
    onValue(productQuery, (snapshot) => {
        const products = [];
        snapshot.forEach((childSnapshot) => {
            const product = childSnapshot.val();
            product.id = childSnapshot.key;
            products.push(product);
        });
        const sortedProducts = sortProducts(products, priceFilter);
        document.getElementById('productList').innerHTML = sortedProducts.map(createProductCard).join('');
    });
}

function sortProducts(products, sortOrder) {
    if (sortOrder === 'low-high') {
        return products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
        return products.sort((a, b) => b.price - a.price);
    }
    return products;
}

window.searchServices = function searchServices() {
    const searchQuery = document.getElementById('serviceSearch').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let serviceQuery = ref(database, 'services');
    if (categoryFilter) {
        serviceQuery = query(serviceQuery, orderByChild('category'), equalTo(categoryFilter));
    }
    onValue(serviceQuery, (snapshot) => {
        const services = [];
        snapshot.forEach((childSnapshot) => {
            const service = childSnapshot.val();
            service.id = childSnapshot.key;
            services.push(service);
        });
        const sortedServices = sortServices(services, priceFilter);
        document.getElementById('serviceList').innerHTML = sortedServices.map(createServiceCard).join('');
    });
}

function sortServices(services, sortOrder) {
    if (sortOrder === 'low-high') {
        return services.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
        return services.sort((a, b) => b.price - a.price);
    }
    return services;
}

window.proceedToCheckout = function proceedToCheckout() {
    window.location.href = 'order-confirmation.html';
}

window.confirmBooking = function confirmBooking() {
    const serviceName = document.getElementById('serviceName').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    const specialRequirements = document.getElementById('specialRequirements').value;

    const user = auth.currentUser;

    if (user) {
        const bookingRef = push(ref(database, 'bookings/' + user.uid));
        set(bookingRef, {
            serviceName: serviceName,
            bookingDate: bookingDate,
            bookingTime: bookingTime,
            specialRequirements: specialRequirements
        }).then(() => {
            alert("Booking confirmed successfully!");
            window.location.href = 'service-confirmation.html';
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    } else {
        alert("No user is signed in.");
    }
}

function loadFollowers() {
    const user = auth.currentUser;
    if (user) {
        const followersRef = ref(database, 'followers/' + user.uid);
        onValue(followersRef, (snapshot) => {
            const followers = [];
            snapshot.forEach((childSnapshot) => {
                const follower = childSnapshot.val();
                followers.push(follower);
            });
            document.getElementById('followersList').innerHTML = followers.map(createUserCard).join('');
        });
    }
}

function loadFollowing() {
    const user = auth.currentUser;
    if (user) {
        const followingRef = ref(database, 'following/' + user.uid);
        onValue(followingRef, (snapshot) => {
            const following = [];
            snapshot.forEach((childSnapshot) => {
                const followed = childSnapshot.val();
                following.push(followed);
            });
            document.getElementById('followingList').innerHTML = following.map(createUserCard).join('');
        });
    }
}

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

function createUserCard(user) {
    return `
        <div class="user-card">
            <img src="${user.profilePicture}" alt="${user.fullName}" class="user-picture">
            <h3>${user.fullName}</h3>
            <p>${user.bio}</p>
            <button onclick="followUser('${user.id}')">Follow</button>
            <button onclick="messageUser('${user.id}')">Message</button>
        </div>
    `;
}

function createSavedItemCard(item) {
    return `
        <div class="saved-item-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button onclick="viewItemDetails('${item.id}')">View</button>
            <button onclick="removeSavedItem('${item.id}')">Remove</button>
        </div>
    `;
}

window.editProfile = function editProfile() {
    window.location.href = 'edit-profile.html';
}

window.viewFollowers = function viewFollowers() {
    window.location.href = 'followers.html';
}

window.viewFollowing = function viewFollowing() {
    window.location.href = 'following.html';
}

window.viewSavedItems = function viewSavedItems() {
    window.location.href = 'saved.html';
}

window.followUser = function followUser(userId) {
    const user = auth.currentUser;
    if (user) {
        const followRef = push(ref(database, 'following/' + user.uid));
        set(followRef, { id: userId }).then(() => {
            alert("User followed successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

window.messageUser = function messageUser(userId) {
    alert("Message functionality is not implemented yet.");
}

window.viewItemDetails = function viewItemDetails(itemId) {
    alert("View item details functionality is not implemented yet.");
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

// Call functions to load data when the respective pages are loaded
if (document.getElementById('profileDetails')) loadUserProfile(auth.currentUser.uid);
if (document.getElementById('followersList')) loadFollowers();
if (document.getElementById('followingList')) loadFollowing();
if (document.getElementById('savedItemsList')) loadSavedItems();
