// TODO: class pokedex **implement oop
//
class Pokedex {
  constructor() {
    this.pokeCount = 151;
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector("#searchError");
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
        // TODO: Display in api
        return;
      } else {
        const pokeData = await res.json();
        console.log(pokeData);
      }
    } catch (error) {
      return;
    }
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
