import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Move } from '../entities/move.entity';

import { GenerateModule } from '../generate/generate.module';

import { MoveService } from './move.service';

@Module({
  imports: [TypeOrmModule.forFeature([Move]), GenerateModule],
  providers: [MoveService],
  exports: [MoveService],
})
export class MoveModule {}
