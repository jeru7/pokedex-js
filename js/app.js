// TODO: class pokedex **implement oop
//
class Pokedex {
  constructor() {
    this.pokeCount = 151;
    this.searchInput = document.querySelector("#searchInput");
    this.searchBtn = document.querySelector("#searchButton");
    this.searchError = document.querySelector("#searchError");

    // pokemon display
    this.pokeImage = document.querySelector("#pokePic");
    this.pokeName = document.querySelector("#pokeName");
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
        // TODO: Display api error
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

    // pokemon stats
    console.log(data);
  }
}

const pokedex = new Pokedex();
pokedex.runPokedex();
