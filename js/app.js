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
    this.pokeGif.src = `./sprites/sprites/pokemon/other/showdown/${pokeId}.gif`;

    if (pokeId < 10) {
      this.pokeId.innerText = `No. 00${pokeId}`;
    } else if (pokeId < 100) {
      this.pokeId.innerText = `No. 0${pokeId}`;
    } else {
      this.pokeId.innerText = `No. ${pokeId}`;
    }

    console.log(data);

    // pokemon stats
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
