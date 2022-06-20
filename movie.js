let movieList = document.getElementById('movie-list');
let loadMoreBtn = document.getElementById('load-more-btn');
let searchInput = document.getElementById('searchbar');
let page = 1;
let movies = [];
let category;
let keyword;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '125a1d1741msh07b331c5ca1994dp1675cejsnd66baa5d2be3',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};

function formatMovie(movie, addWishlistButton, addRemoveButton) {
    let wishlistButton;
    if (addWishlistButton) {
        wishlistButton = `<a href="javascript:addToWishlist('${movie.id}')" class="btn btn-secondary btn-sm">Add to Wishlist</a>`
    } else {
        wishlistButton = "";
    }

    let removeButton;
    if (addRemoveButton) {
        removeButton = `<a href="javascript:removeFromWishlist('${movie.id}')" class="btn btn-danger btn-sm">Remove</a>`
    } else {
        removeButton = "";
    }

    return `
            <div class="my-3 mx-2">
                <div class="card h-100">
                    <a href="/description.html?${movie.id}">
                    <img src="${movie.primaryImage.url}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <h5 class="card-title">${movie.titleText.text}</h5>
                        <p class="card-text">${movie.releaseDate.year}</p>
                    </div >
                        <div class="p-3">
                        ${wishlistButton}
                        ${removeButton}
                    </div>
                </div >
            </div > `
}

function formatMovielist(page) {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=10&page=${page}&titleType=movie&startYear=2000&endYear=2022&list=most_pop_movies`, options)
        .then(response => response.json())
        .then(response => {
            movies = response.results;
            movies = movies.filter(movie => movie.primaryImage != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie, true, false);
            })
        })
        .catch(err => console.error(err));
}

function loadMovie(movieId) {
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList%5B0%5D=${movieId}`, options)
        .then(response => response.json());
}

function filterByCategoryFirstPage(chosenCategory) {
    page = 1;
    category = chosenCategory;
    movieList.innerHTML = "";
    keyword = "";
    loadMoreBtn.classList.remove("disabled");
    filterByCategory(chosenCategory, page);
}

function filterByCategory(category, page) {
    loadMoreBtn.classList.remove("disabled");
    fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&page=${page}&titleType=movie&genre=${category}&startYear=2000&endYear=2022&list=most_pop_movies`, options)
        .then(response => response.json())
        .then(response => {
            movies = response.results;
            if (movies.length === 0) {
                movieList.innerHTML = '<h3>Sorry, no movies found.</h3>'
                loadMoreBtn.classList.add("disabled");
            }
            movies = movies.filter(movie => movie.primaryImage != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie, true, false);
            })
        })
        .catch(err => console.error(err));
}

function searchFirstPage() {
    page = 1;
    movieList.innerHTML = "";
    loadMoreBtn.classList.remove("disabled");
    search(page);
}

function search(page) {
    console.log('page: ' + page);
    loadMoreBtn.classList.remove("disabled");
    keyword = searchInput.value;
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?info=mini_info&limit=20&page=${page}&titleType=movie&sort=year.decr`, options)
        .then(response => response.json())
        .then(response => {
            movies = response.results;
            if (movies.length < 20){
                loadMoreBtn.classList.add("disabled");
            }
            movies = movies.filter(movie => movie.primaryImage != null && movie.releaseDate != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie);
            })
        })
        .catch(err => console.error(err));
}

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
})

function loadMore(category) {
    page++;
    console.log(keyword);
    console.log(category);
    if (keyword) {
        console.log('if keyword true');
        search(page);
    }
    else if (category == 'undefined') {
        console.log('if movie list true');
        formatMovielist(page);
    }
    else {
        console.log(category);
        filterByCategory(category, page);
    }
}

