let categoryList = document.getElementById('category-menu');

function generateListElement(category) {
    return `<li><a class="dropdown-item" onclick="filterByCategoryFirstPage('${category}')">${category}</a></li>`;
}

function getCategories() {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
        .then(response => response.json())
        .then(response => {
            let categories = response.results;
            categories.map(category => {
                if (category !== null) {
                    categoryList.innerHTML += generateListElement(category);
                }
            })
        })
        .catch(err => console.error(err));
}
