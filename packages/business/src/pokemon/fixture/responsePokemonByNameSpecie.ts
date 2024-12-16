import type { ResponsePokemonSpecie } from '../interface';

export const RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE: ResponsePokemonSpecie = {
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/"
  },
  habitat: {
    name: "grassland",
    url: "https://pokeapi.co/api/v2/pokemon-habitat/3/"
  },
  is_baby: false,
  gender_rate: 1,
  is_mythical: false,
  capture_rate: 45,
  is_legendary: false,
  hatch_counter: 20,
  base_happiness: 50,
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/1/"
  },
  evolves_from_species: null,
  has_gender_differences: false,
};

export const RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE: ResponsePokemonSpecie = {
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/"
  },
  habitat: {
    name: "grassland",
    url: "https://pokeapi.co/api/v2/pokemon-habitat/3/"
  },
  is_baby: false,
  gender_rate: 1,
  is_mythical: false,
  capture_rate: 45,
  is_legendary: false,
  hatch_counter: 20,
  base_happiness: 50,
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/1/"
  },
  evolves_from_species: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/"
  },
  has_gender_differences: false,
};

export const RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE: ResponsePokemonSpecie = {
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/"
  },
  habitat: {
    name: "grassland",
    url: "https://pokeapi.co/api/v2/pokemon-habitat/3/"
  },
  is_baby: false,
  gender_rate: 1,
  is_mythical: false,
  capture_rate: 45,
  is_legendary: false,
  hatch_counter: 20,
  base_happiness: 50,
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/1/"
  },
  evolves_from_species: {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/2/"
  },
  has_gender_differences: true,
};