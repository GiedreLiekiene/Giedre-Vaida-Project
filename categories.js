const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '125a1d1741msh07b331c5ca1994dp1675cejsnd66baa5d2be3',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

let categoryList = document.getElementById('category-menu');

function generateListElement(category) {
    return `<li><a class="dropdown-item" onclick="filterByCategory('${category}')">${category}</a></li>`;
}

function getCategories() {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
        .then(response => response.json())
        .then(response => {
            let categories = response.results;
            categories.map(category => {
                categoryList.innerHTML += generateListElement(category);
            })
        })
        .catch(err => console.error(err));
}
