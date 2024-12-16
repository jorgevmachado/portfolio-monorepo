import { EntityPokemon } from '../interface';
import {
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from './entityPokemon';
import {
  RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE,
  RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE
} from './responsePokemonByNameSpecie';

export const POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
    habitat: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.habitat.name,
    is_baby: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.is_baby,
    shape_url: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.shape.url,
    shape_name: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.shape.name,
    is_mythical: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.is_mythical,
    gender_rate: RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.gender_rate,
    is_legendary:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.is_legendary,
    capture_rate:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.capture_rate,
    hatch_counter:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.hatch_counter,
    base_happiness:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.base_happiness,
    evolution_chain_url:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.evolution_chain.url,
    evolves_from_species:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.evolves_from_species?.name,
    has_gender_differences:
      RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE.has_gender_differences,
  };

export const POKEMON_IVYSAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
    habitat: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.habitat.name,
    is_baby: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.is_baby,
    shape_url: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.shape.url,
    shape_name: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.shape.name,
    is_mythical: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.is_mythical,
    gender_rate: RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.gender_rate,
    is_legendary:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.is_legendary,
    capture_rate:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.capture_rate,
    hatch_counter:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.hatch_counter,
    base_happiness:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.base_happiness,
    evolution_chain_url:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.evolution_chain.url,
    evolves_from_species:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.evolves_from_species
      .name,
    has_gender_differences:
    RESPONSE_POKEMON_BY_NAME_SPECIE_IVYSAUR_FIXTURE.has_gender_differences,
  };

export const POKEMON_VENUSAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
    habitat: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.habitat.name,
    is_baby: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.is_baby,
    shape_url: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.shape.url,
    shape_name: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.shape.name,
    is_mythical: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.is_mythical,
    gender_rate: RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.gender_rate,
    is_legendary:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.is_legendary,
    capture_rate:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.capture_rate,
    hatch_counter:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.hatch_counter,
    base_happiness:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.base_happiness,
    evolution_chain_url:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.evolution_chain.url,
    evolves_from_species:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.evolves_from_species
      .name,
    has_gender_differences:
    RESPONSE_POKEMON_BY_NAME_SPECIE_VENUSAUR_FIXTURE.has_gender_differences,
  };