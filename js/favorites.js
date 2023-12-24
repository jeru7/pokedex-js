// favoritePokemon data
const favoritePokemon =
  JSON.parse(localStorage.getItem("favoritePokemon")) || [];

// favorite pokemon display containers
const favoriteContainer = document.querySelector(".main__favoritesContainer");

// empty message container
const emptyMessageContainer = document.querySelector(
  ".main__noPokemonContainer"
);

// dark mode
let isDarkMode = localStorage.getItem("darkMode") === "true";
darkModeButton = document.querySelector("#darkModeToggler");
darkModeButton.addEventListener("click", () => toggleDarkMode());

// handles the dark styles if the dark mode is on on the main page
function applyDarkStyles() {
  const bodyElement = document.querySelector("body");
  const navElement = document.querySelector(".navbar");
  const navLogoElement = document.querySelector(".navbar__logo");
  const navOptions = document.querySelector(".navbar__options");
  const noPokemonElement = document.querySelector(".main__noPokemonContainer");
  const favoritesContainer = document.querySelector(
    ".main__favoritesContainer"
  );
  const pokemonContainer = document.querySelectorAll(
    ".main__favoritesContainer__pokemon"
  );
  const pokeName = document.querySelectorAll(".pokeName");
  const pokeId = document.querySelectorAll(".pokeId");
  const bottomContainer = document.querySelectorAll(
    ".main__favoritesContainer__pokemon__bottom"
  );
  const pokeStats = document.querySelectorAll(
    ".main__favoritesContainer__pokemon__bottom__pokeStats"
  );

  const footerContainer = document.querySelector(".footer");
  const footerIcon = document.querySelectorAll(".icons");
  if (isDarkMode) {
    bodyElement.classList.add("dark");
    navElement.classList.add("dark");
    navLogoElement.classList.add("dark");
    navOptions.classList.add("dark");
    noPokemonElement.classList.add("dark");
    favoritesContainer.classList.add("dark");
    pokemonContainer.forEach((pokemon) => {
      pokemon.classList.add("dark");
    });
    pokeName.forEach((pokemon) => {
      pokemon.classList.add("dark");
    });
    pokeId.forEach((pokemon) => {
      pokemon.classList.add("dark");
    });
    bottomContainer.forEach((container) => {
      container.classList.add("dark");
    });
    pokeStats.forEach((stats) => {
      stats.classList.add("dark");
    });

    footerContainer.classList.add("dark");
    footerIcon.forEach((icon) => {
      icon.classList.add("dark");
    });
  } else {
    bodyElement.classList.remove("dark");
    navElement.classList.remove("dark");
    navLogoElement.classList.remove("dark");
    navOptions.classList.remove("dark");
    noPokemonElement.classList.remove("dark");
    favoritesContainer.classList.remove("dark");
    pokemonContainer.forEach((pokemon) => {
      pokemon.classList.remove("dark");
    });
    pokeName.forEach((pokemon) => {
      pokemon.classList.remove("dark");
    });
    pokeId.forEach((pokemon) => {
      pokemon.classList.remove("dark");
    });
    bottomContainer.forEach((container) => {
      container.classList.remove("dark");
    });
    pokeStats.forEach((stats) => {
      stats.classList.remove("dark");
    });

    footerContainer.classList.remove("dark");
    footerIcon.forEach((icon) => {
      icon.classList.remove("dark");
    });
  }
}

// handles the dark mode function
function toggleDarkMode() {
  isDarkMode = !isDarkMode;

  const bodyElement = document.querySelector("body");
  const navElement = document.querySelector(".navbar");
  const navLogoElement = document.querySelector(".navbar__logo");
  const navOptions = document.querySelector(".navbar__options");
  const noPokemonElement = document.querySelector(".main__noPokemonContainer");
  const favoritesContainer = document.querySelector(
    ".main__favoritesContainer"
  );
  const pokemonContainer = document.querySelectorAll(
    ".main__favoritesContainer__pokemon"
  );
  const pokeName = document.querySelectorAll(".pokeName");
  const pokeId = document.querySelectorAll(".pokeId");
  const bottomContainer = document.querySelectorAll(
    ".main__favoritesContainer__pokemon__bottom"
  );
  const pokeStats = document.querySelectorAll(
    ".main__favoritesContainer__pokemon__bottom__pokeStats"
  );

  const footerContainer = document.querySelector(".footer");
  const footerIcon = document.querySelectorAll(".icons");

  bodyElement.classList.toggle("dark");
  navElement.classList.toggle("dark");
  navLogoElement.classList.toggle("dark");
  navOptions.classList.toggle("dark");
  noPokemonElement.classList.toggle("dark");
  favoritesContainer.classList.toggle("dark");
  pokemonContainer.forEach((pokemon) => {
    pokemon.classList.toggle("dark");
  });
  pokeName.forEach((pokemon) => {
    pokemon.classList.toggle("dark");
  });
  pokeId.forEach((pokemon) => {
    pokemon.classList.toggle("dark");
  });
  bottomContainer.forEach((container) => {
    container.classList.toggle("dark");
  });
  pokeStats.forEach((stats) => {
    stats.classList.toggle("dark");
  });

  footerContainer.classList.toggle("dark");
  footerIcon.forEach((icon) => {
    icon.classList.toggle("dark");
  });

  localStorage.setItem("darkMode", isDarkMode);
}

// iterates through each pokemon in favorites then display them
async function checkFavoritesPokemon() {
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
      applyDarkStyles();
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }
}

// display pokemon container
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

// diplay pokemon stats
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

// display pokemon stats
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

// display pokemon id and name
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

// display pokemon gif
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

// handles the delete function of delete button in favorites page
function deletePokemon(data, currentContainer) {
  currentContainer.remove();

  const index = favoritePokemon.indexOf(data.id);
  if (index !== -1) {
    favoritePokemon.splice(index, 1);
    localStorage.setItem("favoritePokemon", JSON.stringify(favoritePokemon));
  }
}

checkFavoritesPokemon();
applyDarkStyles();
