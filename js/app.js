const loadCocktApi = async(searchText) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php${searchText}`;
    fetch(url ? url : "error")
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => displyData(data))
        .catch(error => {
            console.log(error)
        })
}

window.addEventListener('load', () => {
    loadCocktApi('?s=');
})

const searchBtn = () => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    if (inputValue === "") {
        console.log("Error");
    } else if (inputValue.length === 1) {
        loadCocktApi('?f=' + inputValue);
    } else {
        loadCocktApi('?s=' + inputValue);
    }
    searchInput.value = '';
}


// show display data

const displyData = (drinks) => {
    const drinkResult = document.getElementById('single-post');
    console.log(drinks)
    drinkResult.textContent = "";
    if (drinks.drinks === null || drinks.drinks === undefined) {
        console.log("error")
    } else {
        drinks.drinks.forEach(drink => {
            const article = document.createElement('article');
            article.classList.add('col');
            article.innerHTML = `
            <div class="card border-warning  shadow">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img src="${drink.strDrinkThumb?drink.strDrinkThumb:'no'}" class="img-fluid rounded-start h-100" alt="...">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h5 class="card-title">${drink.strDrink?drink.strDrink:'no'}</h5>
                                    <p class="card-title">Alcoholic: ${drink.strAlcoholic?drink.strAlcoholic:'no'}</p>
                                    <p class="card-text">Glass: ${drink.strGlass?drink.strGlass:'no'} </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            `
            drinkResult.appendChild(article);
        });
    }

}