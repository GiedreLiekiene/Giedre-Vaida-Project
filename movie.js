function formatMovie(movie) {
    return `
            <div class="col-2 mb-3">
                <div class="card" style="height: 35rem;">
                <img src="${movie.primaryImage.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${movie.titleText.text}</h5>
                    <p class="card-text">${movie.releaseDate.year}</p>                    
                    <p class="card-text">Position: ${movie.position}</p>
                    <!-- <a href="/wishlist.html" class="btn btn-light btn-sm">Add to Wishlist</a> -->
                    <a href="javascript:addToWishlist('${movie.id}')" class="btn btn-light btn-sm">Add to Wishlist</a>
                    </div>
                </div>
            </div>`
}
function formatMovielist() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5169d2f919mshdf245f1192a6010p13258cjsnec1cf9d594e4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    let movieList = document.getElementById('movie-list');

    fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=50&page=1&titleType=movie&genre=Action&list=most_pop_movies', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let movies = response.results;

            console.log(movies);
            console.log(movies[0]);
            //movies.filter(movie => movie.rank < 13).map(movie => {
            movies.map(movie => {

                movieList.innerHTML += formatMovie(movie);
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

    fetch('https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList%5B0%5D=tt13496236', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}