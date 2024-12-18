import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "./entities/pokemon.entity";
import { Pokemon as PokemonBusiness } from "@repo/business/pokemon/pokemon";
import { TypeModule } from './type/type.module';
import { MoveModule } from './move/move.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    TypeModule,
    MoveModule,
    AbilityModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonBusiness],
})
export class PokemonModule {}
