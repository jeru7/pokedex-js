// TODO: class pokedex **implement oop
//
class Pokedex {
  constructor() {
    this.displayContainer = document.querySelector(".main__container__display");
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector(".main__container__searchError");
    this.errorMessage = document.querySelector("#searchError");
    this.favoriteButton = document.querySelector("#favoriteButton");
    this.favoritePokemon = [];
    this.lastSearchedPokemon = null;

    // pokemon display
    this.pokeDisplayContainer = document.querySelector(
      ".main__container__displayPokemon"
    );
    this.pokeGifContainer = document.querySelector(
      ".main__container__displayStats__pokeGif"
    );
    this.pokeStatsConstainer = document.querySelector(
      ".main__container__displayStats__pokeStats__stats"
    );
    this.pokeTypesContainer = document.querySelector(
      ".main__container__displayStats__pokeStats__type"
    );
  }

  // runs pokedex
  runPokedex() {
    const searchHandler = () => {
      const value = this.searchInput.value.toLowerCase().trim();
      if (value === "") {
        return;
      }
      this.searchPokemon(value);
    };

    this.searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchHandler();
      }
    });

    this.favoriteButton.addEventListener("click", () => {
      if (this.lastSearchedPokemon) {
        this.toggleFavorite(this.lastSearchedPokemon);
      }
    });

    this.searchBtn.addEventListener("click", searchHandler);
  }

  // search pokemon using fetch api
  async searchPokemon(value) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${value}/`;
      const res = await fetch(apiURL);

      if (res.status !== 200) {
        this.errorMessage.innerText = `Oops! Pokemon not found. `;
        this.searchError.style.visibility = "visible";
        setTimeout(() => {
          this.searchError.style.visibility = "hidden";
        }, 3000);
        return;
      } else {
        const pokeData = await res.json();
        this.lastSearchedPokemon = pokeData;
        this.displayPokemon(pokeData);
      }
    } catch (error) {
      return;
    }
  }

  toggleFavorite(pokemon) {
    const index = this.favoritePokemon.findIndex(
      (fav) => fav.id === pokemon.id
    );

    if (index === -1) {
      pokemon.isFavorite = true;
      this.favoritePokemon.push(pokemon);
    } else {
      pokemon.isFavorite = false;
      this.favoritePokemon.splice(index, 1);
    }

    this.updateFavoriteButton(pokemon);
  }

  updateFavoriteButton(pokemon) {
    const favoriteButton = this.favoriteButton;
    if (pokemon.isFavorite) {
      favoriteButton.classList.remove("fa-regular", "fa-heart");
      favoriteButton.classList.add("fa-solid", "fa-heart");
    } else {
      favoriteButton.classList.remove("fa-solid", "fa-heart");
      favoriteButton.classList.add("fa-regular", "fa-heart");
    }
  }

  // DISPLAY METHODS
  // display pokemon on the displayContainer
  displayPokemon(data) {
    this.pokeDisplayContainer.innerHTML = "";
    this.pokeStatsConstainer.innerHTML = "";
    this.pokeTypesContainer.innerHTML = "";
    this.pokeGifContainer.innerHTML = "";

    // methods to display specific items of pokemons
    this.displayPokemonImageName(data);
    this.displayPokemonID(data);
    this.displayPokemonSTATS(data);
    this.displayPokemonTYPES(data);
  }

  // display image and name of the pokemon
  displayPokemonImageName(data) {
    this.searchBtn.disabled = true;

    const pokePic = document.createElement("img");
    pokePic.src = `./sprites/sprites/pokemon/other/official-artwork/${data.id}.png`;
    pokePic.setAttribute("id", "pokePic");

    const pokeName = document.createElement("p");
    pokeName.classList.add("main__container__displayPokemon__name");
    pokeName.setAttribute("id", "pokeName");
    pokeName.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    pokePic.addEventListener("load", () => {
      this.pokeDisplayContainer.appendChild(pokePic);
      this.pokeDisplayContainer.appendChild(pokeName);
      this.displayContainer.style.display = "grid";
      this.searchBtn.disabled = false;
    });
  }

  // display then types of the pokemon
  displayPokemonTYPES(data) {
    this.pokeTypesContainer.innerHTML = "";

    data.types.forEach((dataType) => {
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

      this.pokeTypesContainer.appendChild(typeElement);
    });
  }

  // display the stats of the pokemon
  displayPokemonSTATS(data) {
    this.pokeStatsConstainer.innerHTML = "";

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

      this.pokeStatsConstainer.appendChild(pokeStatsInfo);
    });
  }

  // display the pokemon id
  displayPokemonID(data) {
    this.pokeGifContainer.innerHTML = "";
    const pokeGif = document.createElement("img");
    pokeGif.src = `./sprites/sprites/pokemon/other/showdown/${data.id}.gif`;
    pokeGif.setAttribute("id", "pokeGif");

    const pokeId = document.createElement("p");
    pokeId.setAttribute("id", "pokeId");

    if (data.id < 10) {
      pokeId.innerText = `No. 00${data.id}`;
    } else if (data.id < 100) {
      pokeId.innerText = `No. 0${data.id}`;
    } else {
      pokeId.innerText = `No. ${data.id}`;
    }

    this.pokeGifContainer.appendChild(pokeGif);
    this.pokeGifContainer.appendChild(pokeId);
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
