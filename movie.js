let movieList = document.getElementById('movie-list');

function formatMovie(movie, addWishlistButton) {
    let wishlistButton;
    if (addWishlistButton) {
        wishlistButton = `<a href="javascript:addToWishlist('${movie.id}')" class="btn btn-light btn-sm">Add to Wishlist</a>`
    } else {
        wishlistButton = "";
    }

    return `
            <div>
                <div class="card">
                <a href="/description.html?${movie.id}"><img src="${movie.primaryImage.url}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                    <h5 class="card-title">${movie.titleText.text}</h5>
                    <p class="card-text">${movie.releaseDate.year}</p>
                    ${wishlistButton}
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

function formatMovielist() {

    fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=50&page=1&titleType=movie&startYear=2000&endYear=2022&list=most_pop_movies', options)
        .then(response => response.json())
        .then(response => {
            let movies = response.results;
            movies = movies.filter(movie => movie.primaryImage != null);
            movies.map(movie => {
                movieList.innerHTML += formatMovie(movie, true);
            })
        })
        .catch(err => console.error(err));
}

function loadMovie(movieId) {


    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList%5B0%5D=${movieId}`, options)
        .then(response => response.json());
}

function filterByCategory(category) {
    movieList.innerHTML = "";



    fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&page=1&titleType=movie&genre=${category}&startYear=2010&endYear=2020`, options)
        .then(response => response.json())
        .then(response => {
            let categoryMovies = response.results;
            if (categoryMovies.length === 0) {
                movieList.innerHTML = '<h3>Sorry, no movies found.</h3>'
            }
            console.log(categoryMovies);
            categoryMovies = categoryMovies.filter(movie => movie.primaryImage != null);
            categoryMovies.map(movie => {
                movieList.innerHTML += formatMovie(movie);
            })
        })
        .catch(err => console.error(err));
}
