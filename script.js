fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(response => response.json())
    .then(data => {
        showData(data.drinks);
    })
    .catch(error => {
        console.log(error);
    });

const showData = (drinkData) => {
    const container = document.getElementById("drinkData");

    drinkData.forEach(drink => {
        const div = document.createElement("div");
        div.classList.add("drinks");
        div.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
        <h4>Name: ${drink.strGlass.slice(0, 14)}</h4>
        <p>Category: ${drink.strCategory.slice(0, 12)}</p>
        <p>Details: ${drink.strInstructions.slice(0, 15)}...</p>
        <div class="d-flex justify-content-evenly">
        <button onclick="handleAddToCart('${drink.strGlass}','${drink.strDrinkThumb}')">Add To Cart</button>
        <button onclick="handleSeeDetails('${drink.idDrink}')">Details</button>
        </div>
        `;
        container.appendChild(div);
    });
}

const searchInput = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            if (data.drinks) {
                showData(data.drinks);
            } else {
                alert("No results found!");
                searchInput.value = "";
            }
        })
});


let cartCount = 0;
const handleAddToCart = (name, image) => {

    const totalCart = document.getElementById("totalItem").innerText;
    let convertToNumber = parseInt(totalCart);
    if (convertToNumber == 7) {
        alert("You can't add more than 7 items");
        return;
    }
    convertToNumber++;
    document.getElementById("totalItem").innerText = convertToNumber;
    const container = document.getElementById("cartData");
    const div = document.createElement("div");
    div.classList.add("cart-item");
    cartCount++;
    div.innerHTML = `
    <p>${cartCount}</p>
    <img src="${image}" alt="${name}"/>
    <p>${name}</p>
    `;

    container.appendChild(div);
};

const handleSeeDetails = (id) => {
    console.log(id);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
            const drink = data.drinks[0];

            document.getElementById("openModalLabel").innerText = drink.strDrink;
            document.querySelector(".modal-body").innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="img-fluid rounded mb-3" />
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        `;
            const modal = new bootstrap.Modal(document.getElementById("openModal"));
            modal.show();
        })

};
