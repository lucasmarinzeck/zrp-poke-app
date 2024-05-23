import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from './entities/pokemon.entity';
import { Abilities } from './entities/abilities';

@Injectable()
export class PokemonsService {
  private readonly url = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async findAllAbilities(limit: number, offset: number) {
    const { data } = await lastValueFrom(
      this.httpService.get<Abilities>(`${this.url}/ability/?limit=367`),
    );

    return data.results
      .sort((a, b) => this.sortAlphabetically(a.name, b.name))
      .slice(offset, offset + limit);
  }

  async findOnePokemon(name: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<Pokemon>(`${this.url}/pokemon/${name}`),
    );

    return this.parsePokemonReponse(data);
  }

  sortAlphabetically(a: string, b: string) {
    return a.localeCompare(b);
  }

  parsePokemonReponse(data: Pokemon) {
    return {
      id: data.id,
      name: data.name,
      abilities: data.abilities.sort((a, b) =>
        this.sortAlphabetically(a.ability.name, b.ability.name),
      ),
      sprite: data.sprites.front_default,
      types: data.types,
    };
  }
}
