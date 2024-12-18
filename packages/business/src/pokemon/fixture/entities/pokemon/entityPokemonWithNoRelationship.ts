import { EntityPokemon } from '../../../interface';
import { ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE } from './entityPokemon';
import {
  RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE,
} from '../../response';

export const ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
    ...ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
    image: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.image,
    hp: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.hp,
    speed: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.speed,
    attack: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.attack,
    defense: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.defense,
    habitat: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.habitat,
    is_baby: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.is_baby,
    shape_url: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.shape_url,
    shape_name: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.shape_name,
    is_mythical: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.is_mythical,
    gender_rate: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.gender_rate,
    is_legendary: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.is_legendary,
    capture_rate: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.capture_rate,
    hatch_counter: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.hatch_counter,
    base_happiness: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.base_happiness,
    special_attack: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.special_attack,
    special_defense: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.special_defense,
    evolution_chain_url: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.evolution_chain_url,
    evolves_from_species: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.evolves_from_species,
    has_gender_differences: RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE.has_gender_differences,
};