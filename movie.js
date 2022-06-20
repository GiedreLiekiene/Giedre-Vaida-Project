let movieList = document.getElementById('movie-list');
let loadMoreBtn = document.getElementById('load-more');
let page = 1;
let movies = [];
let category;

function formatMovie(movie, addWishlistButton, addRemoveButton) {
    let wishlistButton;
    if (addWishlistButton) {
        wishlistButton = `<a href="javascript:addToWishlist('${movie.id}')" class="btn btn-light btn-sm">Add to Wishlist</a>`
    } else {
        wishlistButton = "";
    }

    let removeButton;
    if (addRemoveButton) {
        removeButton = `<a href="javascript:removeFromWishlist('${movie.id}')" class="btn btn-danger btn-sm">Remove</a>`
    } else {
        removeButton = "";
    }

    console.log(movie)
    return `
            <div>
                <div class="card">
                <a href="/description.html?${movie.id}"><img src="${movie.primaryImage.url}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                    <h5 class="card-title">${movie.titleText.text}</h5>
                    <p class="card-text">${movie.releaseDate.year}</p>
                    ${wishlistButton}
                    ${removeButton}
                    </div >
                </div >
            </div > `
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '125a1d1741msh07b331c5ca1994dp1675cejsnd66baa5d2be3',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};

function formatMovielist(page) {
    console.log(page);
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

function filterByCategory(category, page) {
    console.log(page);
    fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&page=${page}&titleType=movie&genre=${category}&startYear=2000&endYear=2022&list=most_pop_movies`, options)
        .then(response => response.json())
        .then(response => {
            movies = response.results;
            if (movies.length === 0) {
                movieList.innerHTML = '<h3>Sorry, no movies found.</h3>'
            }
            console.log(movies);
            movies = movies.filter(movie => movie.primaryImage != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie, true, false);
            })
        })
        .catch(err => console.error(err));
    console.log(category);
}

function filterByCategoryFirstPage(chosenCategory) {
    page = 1;
    category = chosenCategory;
    movieList.innerHTML = "";
    filterByCategory(chosenCategory, page);
}

function searchInList() {
    let keyword = document.getElementById('searchbar').value;
    console.log(keyword);
    movieList.innerHTML = "";
    movies = movies.filter(movie => movie.titleText.text.includes(keyword));
    movies.map(movie => {
        movieList.innerHTML += formatMovie(movie);
    })
}

function search() {
    let keyword = document.getElementById('searchbar').value;
    movieList.innerHTML = "";
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?info=mini_info&limit=50&page=1&titleType=movie&sort=year.decr`, options)
        .then(response => response.json())
        .then(response => {
            movies = response.results;
            console.log(movies);

            movies = movies.filter(movie => movie.primaryImage != null && movie.releaseDate != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie);
            })
        })
        .catch(err => console.error(err));
}

let input = document.getElementById('searchbar');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
})

function loadMore(category) {
    console.log(category);
    page++;
    if (category == 'undefined') {
        formatMovielist(page);
    }
    else {
        filterByCategory(category, page);
    }
}

