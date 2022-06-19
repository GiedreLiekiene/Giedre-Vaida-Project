function loadDescription(movieId) {
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList%5B0%5D=${movieId}&info=base_info`, options)
        .then(response => response.json());
}

function showDescription(movieId) {
    let descriptionElement = document.getElementById('movie');
    //let baseinfo = loadbaseinfo();

    loadDescription(movieId).then(response => {
        console.log(response)
        let movie = response.results[0]


        descriptionElement.innerHTML =
            `<div>
                <div class="descriptioncard">
                    <img src="${movie.primaryImage.url}" class="descriptioncard-img" alt="..."> 
                    <div class="descriptioncard-body">
                    <h5 class="descriptioncard-title">${movie.titleText.text}</h5>
                    <p class="descriptioncard-text">${movie.releaseDate.year}</p>
                    <p class="descriptioncard-description">${movie.plot.plotText.plainText}</p>
                    </div >
                </div >
            </div > `
    })
}

