import { ResponsePokemonName } from "../interface";

export const RESPONSE_TYPE_GRASS_FIXTURE: ResponsePokemonName['types'][number] = {
    slot: 1,
    type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
    order: 12
};

export const RESPONSE_TYPE_POISON_FIXTURE: ResponsePokemonName['types'][number] = {
    slot: 2,
    type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
    order: 4
};

export const RESPONSE_LIST_TYPE_FIXTURE: ResponsePokemonName['types'] = [
    RESPONSE_TYPE_GRASS_FIXTURE,
    RESPONSE_TYPE_POISON_FIXTURE
];