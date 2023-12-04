// TODO: class pokedex **implement oop
class Pokedex {
  constructor() {
    this.pokeCount = 151;
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector("#searchError");
  }

  addEvents() {
    this.searchBtn.addEventListener("click", () => {
      // TODO: show invalid input
      const value = this.searchInput.value;
      if (value.trim() === "") {
        return;
      }

      this.searchPokemon(this.searchInput);
    });
  }

  async searchPokemon(value) {
    try {
      let pokeList = [];
      const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${this.pokeCount}/`;
      const res = await fetch(apiURL);

      if (res.status !== 200) {
        // TODO: Display no pokemon found
        return;
      } else {
        const data = await res.json();
        pokeList = data.results;
      }
    } catch (error) {
      return;
    }
  }
}

const pokedex = new Pokedex();
pokedex.addEvents();
