import type { EntityAbility } from '../../interface';
import {RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE} from "../response";

export const ENTITY_OVERGROW_FIXTURE: EntityAbility = {
    id: 'fc6e1615-2061-4e44-95c2-270dabda7cf7',
    url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[0].url,
    name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[0].name,
    slot: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[0].slot,
    order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[0].order,
    is_hidden: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[0].is_hidden,
    created_at: new Date('2024-12-17T03:01:22.577Z'),
    updated_at: new Date('2024-12-17T03:01:22.577Z'),
    deleted_at: undefined,
};

export const ENTITY_CHLOROPHYLL_FIXTURE: EntityAbility = {
    id: '36d17828-61c1-448d-b596-c4da94b9ac16',
    url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[1].url,
    name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[1].name,
    slot: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[1].slot,
    order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[1].order,
    is_hidden: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities[1].is_hidden,
    created_at: new Date('2024-12-17T03:01:22.577Z'),
    updated_at: new Date('2024-12-17T03:01:22.577Z'),
    deleted_at: undefined,
};