import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from './entities/pokemon.entity';
import { Abilities, Result } from './entities/abilities';
import { Ability } from './entities/ability';

@Injectable()
export class PokemonsService {
  private readonly url = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async findAbility(id: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<Ability>(`${this.url}/ability/${id}`),
    );

    return this.parseAbility(data);
  }

  parseAbility(data: Ability) {
    const englishEntry = data.effect_entries.filter(
      (entry) => entry.language.name === 'en',
    )[0];

    return {
      id: data.id,
      name: data.name,
      shortEffect: englishEntry.short_effect,
      effect: englishEntry.effect,
    };
  }

  async findAllAbilities(limit: number, offset: number) {
    const { data } = await lastValueFrom(
      this.httpService.get<Abilities>(`${this.url}/ability/?limit=367`),
    );

    return data.results
      .sort((a, b) => this.sortAlphabetically(a.name, b.name))
      .map((abilityEntry) => this.parseAbilities(abilityEntry))
      .slice(offset, offset + limit);
  }

  parseAbilities(data: Result) {
    const url = data.url;
    const parts: string[] = url.split('/').filter((part) => part !== '');
    const id: string = parts[parts.length - 1];

    return {
      ...data,
      id,
    };
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
