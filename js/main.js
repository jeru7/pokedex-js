// pokedex class
class Pokedex {
  // constructor
  constructor() {
    // containers
    this.displayContainer = document.querySelector(".main__container__display");
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

    if (this.isDarkMode) {
      this.pokeStatsConstainer.classList.add("dark");
    } else {
      this.pokeStatsConstainer.classList.remove("dark");
    }

    // search inputs, button, and error messages
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector(".main__container__searchError");
    this.errorMessage = document.querySelector("#searchError");
    this.searchInProgress = false;

    // favorite functions
    this.favoritePokemon = [];
    this.loadFavoritePokemon();
    this.checkFavorites();

    // runs pokedex after being initialized
    this.runPokedex();

    // dark mode
    this.isDarkMode = false;
    this.darkModeButton = document.querySelector("#darkModeToggler");
    this.darkModeButton.addEventListener("click", () => this.toggleDarkMode());
    this.checkDarkMode();
  }

  checkDarkMode() {
    const darkMode = localStorage.getItem("darkMode");
    this.isDarkMode = darkMode === "true";

    this.applyDarkStyles();
  }

  applyDarkStyles() {
    this.bodyElement = document.querySelector("body");
    this.navElement = document.querySelector(".navbar");
    this.navLogoElement = document.querySelector(".navbar__logo");
    this.navOptions = document.querySelector(".navbar__options");
    this.searchContainer = document.querySelector(
      ".main__container__searchContainer"
    );
    this.searchNoteContainer = document.querySelector(
      ".main__container__searchNote"
    );
    const pokeName = document.querySelector(
      ".main__container__displayPokemon__name"
    );
    const favButton = document.querySelector("#favoriteButton");
    const pokeId = document.querySelector("#pokeId");
    const pokeStatsContainerElement = document.querySelector(
      ".main__container__displayStats"
    );
    this.footerContainer = document.querySelector(".footer");
    this.footerIcon = document.querySelectorAll(".icons");

    if (this.isDarkMode) {
      this.bodyElement.classList.add("dark");
      this.navElement.classList.add("dark");
      this.navLogoElement.classList.add("dark");
      this.navOptions.classList.add("dark");
      this.searchContainer.classList.add("dark");
      this.searchNoteContainer.classList.add("dark");
      this.displayContainer.classList.add("dark");
      this.pokeDisplayContainer.classList.add("dark");
      if (pokeName) {
        pokeName.classList.add("dark");
      }
      favButton.classList.add("dark");
      if (pokeId) {
        pokeId.classList.add("dark");
      }
      if (pokeStatsContainerElement) {
        pokeStatsContainerElement.classList.add("dark");
      }
      this.pokeStatsConstainer.classList.add("dark");
      this.footerContainer.classList.add("dark");
      this.footerIcon.forEach((icon) => {
        icon.classList.add("dark");
      });
    } else {
      this.bodyElement.classList.remove("dark");
      this.navElement.classList.remove("dark");
      this.navLogoElement.classList.remove("dark");
      this.navOptions.classList.remove("dark");
      this.searchContainer.classList.remove("dark");
      this.searchNoteContainer.classList.remove("dark");
      this.displayContainer.classList.remove("dark");
      this.pokeDisplayContainer.classList.remove("dark");
      if (pokeName) {
        pokeName.classList.remove("dark");
      }
      favButton.classList.remove("dark");
      if (pokeId) {
        pokeId.classList.remove("dark");
      }
      if (pokeStatsContainerElement) {
        pokeStatsContainerElement.classList.remove("dark");
      }
      this.pokeStatsConstainer.classList.remove("dark");
      this.footerContainer.classList.remove("dark");
      this.footerIcon.forEach((icon) => {
        icon.classList.remove("dark");
      });
    }
  }

  // handles the dark mode function
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    this.bodyElement = document.querySelector("body");
    this.navElement = document.querySelector(".navbar");
    this.navLogoElement = document.querySelector(".navbar__logo");
    this.navOptions = document.querySelector(".navbar__options");
    this.searchContainer = document.querySelector(
      ".main__container__searchContainer"
    );
    this.searchNoteContainer = document.querySelector(
      ".main__container__searchNote"
    );
    const pokeName = document.querySelector(
      ".main__container__displayPokemon__name"
    );
    const favButton = document.querySelector("#favoriteButton");
    const pokeId = document.querySelector("#pokeId");
    const pokeStatsContainerElement = document.querySelector(
      ".main__container__displayStats"
    );
    this.footerContainer = document.querySelector(".footer");
    this.footerIcon = document.querySelectorAll(".icons");

    this.bodyElement.classList.toggle("dark");
    this.navElement.classList.toggle("dark");
    this.navLogoElement.classList.toggle("dark");
    this.navOptions.classList.toggle("dark");
    this.searchContainer.classList.toggle("dark");
    this.searchNoteContainer.classList.toggle("dark");
    this.displayContainer.classList.toggle("dark");
    this.pokeDisplayContainer.classList.toggle("dark");
    if (pokeName) {
      pokeName.classList.toggle("dark");
    }
    favButton.classList.toggle("dark");
    if (pokeId) {
      pokeId.classList.toggle("dark");
    }
    if (pokeStatsContainerElement) {
      pokeStatsContainerElement.classList.toggle("dark");
    }
    this.pokeStatsConstainer.classList.toggle("dark");
    this.footerContainer.classList.toggle("dark");
    this.footerIcon.forEach((icon) => {
      icon.classList.toggle("dark");
    });

    localStorage.setItem("darkMode", this.isDarkMode);
  }

  // run pokedex method
  runPokedex() {
    // checks the search input first
    const searchHandler = () => {
      if (this.searchInProgress) {
        // return if the user already pressed the enter and currently searching for pokemon
        return;
      }

      this.searchInProgress = true;

      const value = this.searchInput.value.toLowerCase().trim();
      if (value === "") {
        // return if the user searched for a blank text
        this.searchInProgress = true;
        return;
      }

      // runs the search pokemon method
      this.searchPokemon(value);
    };

    // enables the user to search when the user presses enter key
    this.searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchHandler();
      }
    });

    // enables the user to search when the user presses the search button
    this.searchBtn.addEventListener("click", searchHandler);
  }

  checkFavorites() {
    const favoritesLink = document.querySelector(
      ".navbar__options__buttons.fav"
    );

    if (favoritesLink) {
      favoritesLink.addEventListener("click", () => {
        this.saveFavoriteState();
        window.location.href = "./favorites.html";
      });
    }
  }

  // search pokemon async function
  async searchPokemon(value) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${value}/`;
      // fetch the api
      const res = await fetch(apiURL);

      // checks if the status is not 200
      if (res.status !== 200) {
        // display error messages if the status is 200
        this.errorMessage.innerText = `Oops! Pokemon not found. `;
        this.searchError.style.visibility = "visible";
        setTimeout(() => {
          this.searchError.style.visibility = "hidden";
        }, 3000);
        return;
      } else {
        // converts the data to json
        const pokeData = await res.json();
        // runs the display pokemon method
        this.displayPokemon(pokeData);
      }
    } catch (error) {
      return;
    } finally {
      this.searchInProgress = false;
    }
  }

  // function that displays the details about the pokemon
  displayPokemon(data) {
    // resets
    this.pokeDisplayContainer.innerHTML = "";
    this.pokeStatsConstainer.innerHTML = "";
    this.pokeTypesContainer.innerHTML = "";
    this.pokeGifContainer.innerHTML = "";

    this.displayPokemonImageName(data);
    this.displayPokemonID(data);
    this.displayPokemonSTATS(data);
    this.displayPokemonTYPES(data);

    this.toggleFavButton(data);
    this.updateFavButton(data);

    this.saveFavoriteState();
  }
  // function that handles the fav function
  toggleFavButton(data) {
    const favButton = document.querySelector("#favoriteButton");

    favButton.removeEventListener("click", this.handleFavButtonClick);

    this.handleFavButtonClick = () => {
      const isFavorite = this.favoritePokemon.includes(data.id);

      if (isFavorite) {
        const index = this.favoritePokemon.indexOf(data.id);
        // deletes the current pokemon on the pokemon favorites
        if (index !== -1) {
          this.favoritePokemon.splice(index, 1);
        }
      } else {
        this.favoritePokemon.push(data.id);
      }

      this.updateFavButton(data);
      this.saveFavoriteState();
    };

    favButton.addEventListener("click", this.handleFavButtonClick);
  }

  // handles the fav button ui
  updateFavButton(data) {
    const isFavorite = this.favoritePokemon.includes(data.id);
    const favButton = document.querySelector("#favoriteButton");

    favButton.classList.remove("fa-solid", "fa-regular");
    favButton.classList.add(isFavorite ? "fa-solid" : "fa-regular", "fa-heart");

    if (this.isDarkMode) {
      favButton.classList.add("dark");
    } else {
      favButton.classList.remove("dark");
    }

    if (isFavorite) {
      favButton.style.color = "#FF4033";
    } else {
      favButton.style.color = "#333333";
    }
  }

  // display pokemon image and name
  displayPokemonImageName(data) {
    this.searchBtn.disabled = true;

    const pokePic = document.createElement("img");
    pokePic.src = `./sprites/sprites/pokemon/other/official-artwork/${data.id}.png`;
    pokePic.setAttribute("id", "pokePic");

    const pokeName = document.createElement("p");
    pokeName.classList.add("main__container__displayPokemon__name");

    if (this.isDarkMode) {
      pokeName.classList.add("dark");
    } else {
      pokeName.classList.remove("dark");
    }

    // pokeName.classList.add("dark");
    pokeName.setAttribute("id", "pokeName");
    pokeName.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    pokePic.addEventListener("load", () => {
      this.pokeDisplayContainer.appendChild(pokePic);
      this.pokeDisplayContainer.appendChild(pokeName);
      this.displayContainer.style.display = "grid";
      this.searchBtn.disabled = false;
    });
  }

  // diplay pokemon type/s
  displayPokemonTYPES(data) {
    this.pokeTypesContainer.innerHTML = "";

    if (this.isDarkMode) {
      this.pokeTypesContainer.classList.add("dark");
    } else {
      this.pokeTypesContainer.classList.remove("dark");
    }

    data.types.forEach((dataType) => {
      const typeName = dataType.type.name;

      const typeElement = document.createElement("p");
      typeElement.classList.add("pokeTypes");

      if (this.isDarkMode) {
        this.pokeTypesContainer.classList.add("dark");
      } else {
        this.pokeTypesContainer.classList.remove("dark");
      }

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

  // display pokemon stats
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

  // display pokemon id
  displayPokemonID(data) {
    this.pokeGifContainer.innerHTML = "";
    const pokeGif = document.createElement("img");
    pokeGif.src = `./sprites/sprites/pokemon/other/showdown/${data.id}.gif`;
    pokeGif.setAttribute("id", "pokeGif");

    const pokeId = document.createElement("p");
    pokeId.setAttribute("id", "pokeId");

    if (this.isDarkMode) {
      pokeId.classList.add("dark");
    } else {
      pokeId.classList.remove("dark");
    }

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

  // save the favorite pokemon to local storage then convert it to string
  saveFavoriteState() {
    localStorage.setItem(
      "favoritePokemon",
      JSON.stringify(this.favoritePokemon)
    );
  }

  // loads the local storage
  loadFavoritePokemon() {
    const storedFavoritePokemon = localStorage.getItem("favoritePokemon");
    if (storedFavoritePokemon) {
      this.favoritePokemon = JSON.parse(storedFavoritePokemon);
    }
  }
}

const pokedex = new Pokedex();
