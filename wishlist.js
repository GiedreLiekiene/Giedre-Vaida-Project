function loadWishlist() {
    return JSON.parse(localStorage.getItem("movieWishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("movieWishlist", JSON.stringify(wishlist));
}

function addToWishlist(movieId) {
    let wishlist = loadWishlist();
    if (!wishlist.includes(movieId)) {
        wishlist.push(movieId);
        saveWishlist(wishlist);
    }
}

function removeFromWishlist(movieId) {
    let wishlist = loadWishlist();
    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i] === movieId) {
            wishlist.splice(i, 1);
        }
    }
    saveWishlist(wishlist);
    location.reload();
}

function showWishlist() {
    let wishlistElement = document.getElementById('wish-list');
    let wishlist = loadWishlist();
    console.log(wishlist)
    wishlist.map(movieId => {
        loadMovie(movieId).then(movie => {
            console.log("movie", movieId, movie)
            wishlistElement.innerHTML += formatMovie(movie.results[0], false, true);
        })
    })
}
