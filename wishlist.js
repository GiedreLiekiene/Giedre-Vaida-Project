function loadWishlist() {
    return JSON.parse(localStorage.getItem("movieWishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("movieWishlist", JSON.stringify(wishlist));
}

function addToWishlist(movieId) {
    let wishlist = loadWishlist();
    wishlist.push(movieId);
    saveWishlist(wishlist);
}

function showWishlist() {
    let wishlistElement = document.getElementById('wish-list');
    let wishlist = loadWishlist();
    console.log(wishlist)
    wishlist.map(wish => {
        let cardElement = `
    <p class="card-text">${wish}</p> `
        wishlistElement.innerHTML += cardElement;
    })
}

