let movieList = document.getElementById('movie-list');
formatMovielist();

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
                <img src="${movie.primaryImage.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${movie.titleText.text}</h5>
                    <p class="card-text">${movie.releaseDate.year}</p>
                    <!-- <a href="/wishlist.html" class="btn btn-light btn-sm">Add to Wishlist</a> -->
                    ${wishlistButton}
                    </div >
                </div >
            </div > `
}

function formatMovielist() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '125a1d1741msh07b331c5ca1994dp1675cejsnd66baa5d2be3',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=50&page=1&titleType=movie&startYear=2010&endYear=2021', options)
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
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5169d2f919mshdf245f1192a6010p13258cjsnec1cf9d594e4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList%5B0%5D=${movieId}`, options)
        .then(response => response.json());
}

function filterByCategory(category) {
    movieList.innerHTML = "";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '125a1d1741msh07b331c5ca1994dp1675cejsnd66baa5d2be3',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

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

