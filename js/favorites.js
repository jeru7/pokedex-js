// favoritePokemon data
const favoritePokemon =
  JSON.parse(localStorage.getItem("favoritePokemon")) || [];

// favorite pokemon display containers
const favoriteContainer = document.querySelector(".main__favoritesContainer");

// empty message container
const emptyMessageContainer = document.querySelector(
  ".main__noPokemonContainer"
);
async function checkFavoritesPokemon() {
  console.log("Checking favorite Pokemon...");
  for (const pokeId of favoritePokemon) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
      const res = await fetch(apiURL);

      if (res.status !== 200) {
        alert("ERROR IN API");
        continue;
      }

      const pokeData = await res.json();

      displayPokemon(pokeData);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }
}

function displayPokemon(data) {
  if (favoritePokemon.length == 0) {
    emptyMessageContainer.style.display = "block";
    favoriteContainer.style.display = "none";
  } else {
    emptyMessageContainer.style.display = "none";
    favoriteContainer.style.display = "grid";
  }

  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("main__favoritesContainer__pokemon");

  const pokemonContainerTop = document.createElement("div");
  pokemonContainerTop.classList.add("main__favoritesContainer__pokemon__top");

  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fa");
  deleteButton.classList.add("fa-trash");
  deleteButton.setAttribute("id", "deleteButton");

  deleteButton.addEventListener("click", () =>
    deletePokemon(data, pokemonContainer)
  );

  pokemonContainerTop.appendChild(deleteButton);

  displayPokeGif(data, pokemonContainerTop);
  displayPokeIdName(data, pokemonContainerTop);

  const pokemonContainerBottom = document.createElement("div");
  pokemonContainerBottom.classList.add(
    "main__favoritesContainer__pokemon__bottom"
  );

  displayPokeTypes(data, pokemonContainerBottom);
  displayPokeStats(data, pokemonContainerBottom);

  pokemonContainer.appendChild(pokemonContainerTop);
  pokemonContainer.appendChild(pokemonContainerBottom);

  favoriteContainer.appendChild(pokemonContainer);
}

function displayPokeStats(data, container) {
  // pokemon stats
  const pokeStatsConstainer = document.createElement("div");
  pokeStatsConstainer.classList.add(
    "main__favoritesContainer__pokemon__bottom__pokeStats"
  );

  data.stats.forEach((stat) => {
    const statInfo = stat.stat;
    const statName = statInfo.name.toUpperCase();
    const statValue = stat.base_stat;

    const pokeStatsInfo = document.createElement("p");
    pokeStatsInfo.classList.add("pokeStatsInfo");

    const pokeStatsName = document.createElement("span");
    pokeStatsName.classList.add("pokeStatsName");

    const pokeStatsValue = document.createElement("span");
    pokeStatsValue.classList.add("pokeStats");

    if (statName.includes("SPECIAL")) {
      pokeStatsName.innerText = `${statName.replace(
        /SPECIAL[-\s]*/g,
        "SPECIAL "
      )}: `;
    } else {
      pokeStatsName.innerText = `${statName}: `;
    }

    pokeStatsValue.innerText = `${statValue}`;

    pokeStatsInfo.appendChild(pokeStatsName);
    pokeStatsInfo.appendChild(pokeStatsValue);

    pokeStatsConstainer.appendChild(pokeStatsInfo);
  });

  container.appendChild(pokeStatsConstainer);
}

function displayPokeTypes(data, container) {
  // pokemon types
  const pokeTypesContainer = document.createElement("div");
  pokeTypesContainer.classList.add(
    "main__favoritesContainer__pokemon__bottom__pokeTypes"
  );

  data.types.forEach((dataType) => {
    console.log(dataType);
    const typeName = dataType.type.name;

    const typeElement = document.createElement("p");
    typeElement.classList.add("pokeTypes");

    typeElement.innerText = `${typeName.toUpperCase()}`;
    switch (typeName) {
      case "normal":
        typeElement.style.backgroundColor = "#a8a878";
        break;
      case "fire":
        typeElement.style.backgroundColor = "#f08030";
        break;
      case "water":
        typeElement.style.backgroundColor = "#6890f0";
        break;
      case "electric":
        typeElement.style.backgroundColor = "#f8d030";
        break;
      case "grass":
        typeElement.style.backgroundColor = "#78c850";
        break;
      case "ice":
        typeElement.style.backgroundColor = "#98d8d8";
        break;
      case "fighting":
        typeElement.style.backgroundColor = "#c03028";
        break;
      case "poison":
        typeElement.style.backgroundColor = "#a040a0";
        break;
      case "ground":
        typeElement.style.backgroundColor = "#e0c068";
        break;
      case "flying":
        typeElement.style.backgroundColor = "#a890f0";
        break;
      case "psychic":
        typeElement.style.backgroundColor = "#f85888";
        break;
      case "bug":
        typeElement.style.backgroundColor = "#a8b820";
        break;
      case "rock":
        typeElement.style.backgroundColor = "#b8a038";
        break;
      case "ghost":
        typeElement.style.backgroundColor = "#705898";
        break;
      case "dragon":
        typeElement.style.backgroundColor = "#7038f8";
        break;
      case "dark":
        typeElement.style.backgroundColor = "#705848";
        break;
      case "steel":
        typeElement.style.backgroundColor = "#b8b8d0";
        break;
      case "fairy":
        typeElement.style.backgroundColor = "#ee99ac";
        break;
    }

    pokeTypesContainer.appendChild(typeElement);
  });

  container.appendChild(pokeTypesContainer);
}

function displayPokeIdName(data, container) {
  const pokeIdNameContainer = document.createElement("div");
  pokeIdNameContainer.classList.add(
    "main__favoritesContainer__pokemon__top__pokeIdName"
  );

  const pokeName = document.createElement("p");
  pokeName.classList.add("pokeName");
  pokeName.innerText = `${
    data.name.charAt(0).toUpperCase() + data.name.slice(1)
  } `;

  const pokeId = document.createElement("p");
  pokeId.classList.add("pokeId");
  if (data.id < 10) {
    pokeId.innerText = `No. 00${data.id}`;
  } else if (data.id < 100) {
    pokeId.innerText = `No. 0${data.id}`;
  } else {
    pokeId.innerText = `No. ${data.id}`;
  }

  pokeIdNameContainer.appendChild(pokeName);
  pokeIdNameContainer.appendChild(pokeId);

  container.appendChild(pokeIdNameContainer);
}

function displayPokeGif(data, container) {
  const gifContainer = document.createElement("div");
  gifContainer.classList.add("main__favoritesContainer__pokemon__top__pokeGif");

  const pokeGif = document.createElement("img");
  pokeGif.setAttribute(
    "src",
    `./sprites/sprites/pokemon/other/showdown/${data.id}.gif`
  );
  pokeGif.setAttribute("alt", `${data.name} gif`);
  pokeGif.setAttribute("id", "pokeGif");
  gifContainer.appendChild(pokeGif);

  container.appendChild(gifContainer);
}

function deletePokemon(data, currentContainer) {
  currentContainer.remove();

  const index = favoritePokemon.indexOf(data.id);
  if (index !== -1) {
    favoritePokemon.splice(index, 1);
    localStorage.setItem("favoritePokemon", JSON.stringify(favoritePokemon));
  }
}

checkFavoritesPokemon();
