import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  providers: [MoveService, PokemonBusiness],
  exports: [MoveService],
})
export class MoveModule {}
