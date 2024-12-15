import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Paginate, QueryParameters } from '@repo/business/api/interface';
import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import { Service } from '../shared';
import { GenerationService } from './generation/generation.service';

@Injectable()
export class PokemonService extends Service<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    protected repository: Repository<Pokemon>,
    protected business: PokemonBusiness,
    protected generationService: GenerationService,
  ) {
    super('pokemons', [], repository);
  }

  async findAll(
    parameters: QueryParameters,
  ): Promise<Array<Pokemon> | Paginate<Pokemon>> {
    await this.initializeDatabase();
    return this.list({ parameters });
  }

  private async initializeDatabase(): Promise<void> {
    const total = await this.repository.count();

    if (total === 0) {
      const pokemonList = await this.generationService.generateList();

      return this.createPokemonList(pokemonList);
    }

    if (total !== this.business.limit) {
      const pokemonList = await this.generationService.generateList();

      const entities = total !== 0 ? await this.repository.find() : [];

      const saveList =
        this.generationService.returnsDifferenceBetweenDatabaseAndExternalApi(
          entities,
          pokemonList,
        );

      return this.createPokemonList(saveList);
    }
  }

  private async createPokemonList(list: Array<Pokemon>) {
    return Promise.all(list.map((item: Pokemon) => this.repository.save(item)))
      .then()
      .catch((error) => this.error(error));
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }
}
