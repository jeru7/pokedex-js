// TODO: class pokedex **implement oop
//
class Pokedex {
  constructor() {
    this.pokeCount = 151;
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector(".main__container__searchError");
    this.closeErrorButton = document.querySelector("#closeError");

    // pokemon display
    this.pokeImage = document.querySelector("#pokePic");
    this.pokeName = document.querySelector("#pokeName");
    this.pokeGif = document.querySelector("#pokeGif");
  }

  runPokedex() {
    this.searchBtn.addEventListener("click", () => {
      // TODO: show invalid input
      const value = this.searchInput.value;
      if (value.trim() === "") {
        return;
      }

      this.searchPokemon(value);
    });
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

    // pokemon stats
    console.log(data);
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
