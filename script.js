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
        <p>Details: ${drink.strInstructions.slice(0, 10)}...</p>
        <button>Add To Cart</button>
        <button>Details</button>
        `;
        container.appendChild(div);
    });
}
