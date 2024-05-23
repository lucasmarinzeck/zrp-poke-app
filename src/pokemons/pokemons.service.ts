import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
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

    const flavorText = data.flavor_text_entries.filter(
      (entry) => entry.language.name === 'en',
    )[0];

    // Some cases the API does not have an desc for the ability
    return {
      id: data.id,
      name: data.name,
      shortEffect: englishEntry?.short_effect
        ? englishEntry?.short_effect
        : 'No description',
      effect: englishEntry?.effect ? flavorText.flavor_text : 'No description',
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

  sortAlphabetically(a: string, b: string) {
    return a.localeCompare(b);
  }
}
