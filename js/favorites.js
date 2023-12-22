// favoritePokemon data
const favoritePokemon =
  JSON.parse(localStorage.getItem("favoritePokemon")) || [];

// favorite pokemon display containers
const favoriteContainer = document.querySelector(".main__favoritesContainer");

// delete button
const deleteButton = document.querySelector("#deleteButton");

async function checkFavoritesPokemon() {
  for (const pokeId of favoritePokemon) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
      const res = await fetch(apiURL);

      if (res.status !== 200) {
        // display error on the pokemon container
        displayErrorPokemon();
        continue;
      }

      const pokeData = await res.json();

      displayPokemon(pokeData);
    } catch (error) {
      displayErrorPokemon();
    }
  }
}

function displayPokemon(data) {
  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("main__favoritesContainer__pokemon");

  const pokemonContainerTop = document.createElement("div");
  pokemonContainerTop.classList.add("main__favoritesContainer__pokemon__top");

  const deleteButton = document.createElement("i");
  deleteButton.setAttribute("id", "deleteButton");

  displayPokeGif(data, pokemonContainerTop);
  displayPokeIdName(data, pokemonContainerTop);

  const pokemonContainerBottom = document.createElement("div");
  pokemonContainerBottom.classList.add(
    "main__favoritesContainer__pokemon__bottom"
  );

  displayPokeTypes(data, pokemonContainerBottom);
  displayPokeStats(data, pokemonContainerBottom);

  // favoriteContainer.appendChild(pokemonContainer);
}
