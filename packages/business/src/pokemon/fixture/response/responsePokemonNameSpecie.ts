import type { ResponsePokemonSpecie } from '../../interface';
import {RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE} from "../../../api/pokemon/fixture/getSpeciesByName";

export const RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE: ResponsePokemonSpecie = {
  habitat: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.habitat.name,
  is_baby: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.is_baby,
  shape_url: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.shape.url,
  shape_name: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.shape.name,
  is_mythical: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.is_mythical,
  gender_rate: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.gender_rate,
  is_legendary: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.is_legendary,
  capture_rate: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.capture_rate,
  hatch_counter: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.hatch_counter,
  base_happiness: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.base_happiness,
  evolution_chain_url: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.evolution_chain.url,
  evolves_from_species: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.evolves_from_species.name,
  has_gender_differences: RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE.has_gender_differences,
};