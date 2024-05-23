import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Abilities, Result } from './entities/abilities';
import { Ability } from './entities/ability';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonsService {
  private readonly url = 'https://pokeapi.co/api/v2';

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAbility(id: string) {
    const abilityId = `ability_${id}`;
    const cachedAbility = await this.cacheManager.get<Ability>(abilityId);

    if (cachedAbility) {
      return cachedAbility;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Ability>(`${this.url}/ability/${id}`),
    );

    await this.cacheManager.set(abilityId, data);
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
    const cachedAbilities = await this.cacheManager.get<Abilities>('ABILITIES');
    console.log({ cachedAbilities });

    if (cachedAbilities) {
      return cachedAbilities;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Abilities>(`${this.url}/ability/?limit=367`),
    );

    const result = data.results
      .sort((a, b) => this.sortAlphabetically(a.name, b.name))
      .map((abilityEntry) => this.parseAbilities(abilityEntry))
      .slice(offset, offset + limit);

    await this.cacheManager.set('ABILITIES', result);

    return result;
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
