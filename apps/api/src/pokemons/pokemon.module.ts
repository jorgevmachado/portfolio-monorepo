import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';

import { TypeModule } from './type/type.module';
import { MoveModule } from './move/move.module';
import { AbilityModule } from './ability/ability.module';

import { Pokemon } from './entities/pokemon.entity';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeModule,
    MoveModule,
    AbilityModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonExternalBusiness],
})
export class PokemonModule {}
