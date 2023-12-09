// TODO: class pokedex **implement oop
//
class Pokedex {
  constructor() {
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector(".main__container__searchError");
    this.closeErrorButton = document.querySelector("#closeError");

    // pokemon display
    this.pokeImage = document.querySelector("#pokePic");
    this.pokeName = document.querySelector("#pokeName");
    this.pokeGif = document.querySelector("#pokeGif");
    this.pokeId = document.querySelector("#pokeId");
    this.pokeStatsConstainer = document.querySelector(
      ".main__container__displayStats__pokeStats__stats"
    );
    this.pokeTypesContainer = document.querySelector(
      ".main__container__displayStats__pokeStats__type"
    );
  }

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

    this.searchBtn.addEventListener("click", searchHandler);
  }

  async searchPokemon(value) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${value}/`;
      const res = await fetch(apiURL);

      if (res.status !== 200) {
        this.searchError.style.visibility = "visible";
        this.closeErrorButton.addEventListener("click", () => {
          this.searchError.style.visibility = "hidden";
        });
        return;
      } else {
        const pokeData = await res.json();
        this.displayPokemon(pokeData);
      }
    } catch (error) {
      return;
    }
  }

  displayPokemon(data) {
    // pokemon image and name
    const pokeId = data.id;
    const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    this.pokeImage.src = `./sprites/sprites/pokemon/other/official-artwork/${pokeId}.png`;
    this.pokeName.innerText = pokeName;

    if (pokeName === "Kyogre") {
      this.pokeGif.style.width = "250px";
    } else {
      this.pokeGif.style.width = "200px";
    }

    this.pokeGif.src = `./sprites/sprites/pokemon/other/showdown/${pokeId}.gif`;

    this.displayPokemonID(pokeId);
    this.displayPokemonSTATS(data);
    this.displayPokemonTYPES(data);

    console.log(data);

    // pokemon stats
  }

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

  displayPokemonID(id) {
    if (id < 10) {
      this.pokeId.innerText = `No. 00${id}`;
    } else if (id < 100) {
      this.pokeId.innerText = `No. 0${id}`;
    } else {
      this.pokeId.innerText = `No. ${id}`;
    }
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
