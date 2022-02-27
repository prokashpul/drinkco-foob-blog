const loadDrinkApi = async (searchText) => {
    pageLoad('flex');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php${searchText}`;
    fetch(url ? url : "error")
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => displayData(data))
        .catch(error => {
            console.log(error)
        })
}
// spinner function
const pageLoad = (toggle) => {
    document.getElementById('spinner').style.display = toggle;
}

window.addEventListener('load', () => {
    loadDrinkApi('?s=');
})

const searchBtn = () => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    if (inputValue === "") {
        console.log("Error");
    } else if (inputValue.length === 1) {
        loadDrinkApi('?f=' + inputValue);
    } else {
        loadDrinkApi('?s=' + inputValue);
    }
    searchInput.value = '';
}
// error sms
const errorMessage = () => {
    const err = document.getElementById('error-message');
    err.innerText = "";
    err.innerText = `
        Search result is not found !! 😒😒😒 try again..
    `

}

// show display data

const displayData = (drinks) => {
    const drinkResult = document.getElementById('single-post');
    console.log(drinks)
    drinkResult.textContent = "";
    if (drinks.drinks === null || drinks.drinks === undefined) {
        errorMessage();
        // reload after 5sec
        setTimeout(function () {
            location.reload();
        }, 5000);
    } else {
        drinks.drinks.forEach(drink => {
            const article = document.createElement('article');
            article.classList.add('col');
            article.innerHTML = `
            <div class="card border-warning  shadow">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img src="${drink.strDrinkThumb?drink.strDrinkThumb:'no'}" class=" rounded-start" alt="...">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h5 class="card-title">${drink.strDrink?drink.strDrink:'no'}</h5>
                                    <p class="card-title">Alcoholic: ${drink.strAlcoholic?drink.strAlcoholic:'no'}</p>
                                    <p class="card-text">Glass: ${drink.strGlass?drink.strGlass:'no'} </p>
                                    <button type="button" class="btn btn-warning btn-sm rounded-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getID(${drink.idDrink})">Read More</button>                                   
                                </div>
                            </div>
                        </div>
                    </div>
            `
            drinkResult.appendChild(article);
        });
    }
    pageLoad('none');
}

// single article load
const singleDataLoad = (viewData) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${viewData}`;
    pageLoad('flex');
    fetch(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => singleView(data))
        .catch(error => console.log(error))
}

// click event
const getID = (singleID) => {
    singleDataLoad(singleID);
}
// single data display

const singleView = (singleData) => {
    const drink = singleData.drinks[0];
    const singleViewDisplay = document.getElementById('single-view');
    singleViewDisplay.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add("modal-content");
    div.innerHTML = `
            <div class="d-flex justify-content-end m-1">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <img src="${drink.strDrinkThumb?drink.strDrinkThumb:""}" alt="" height=" 100" width="100p" class="rounded-circle bg-primary mt-3">
                <h4 class="text-warning">${drink.strDrink?drink.strDrink:"Drink"}</h4>
                <p>${drink.strGlass?drink.strGlass:'no'} </p>
                <p>${drink.strInstructions?drink.strInstructions:'no'}</p>
            </div>
    `

    singleViewDisplay.appendChild(div)
    pageLoad('none');
}