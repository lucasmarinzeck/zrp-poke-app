import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { FindAllAbilitiesQueryDto } from './dtos/FindAllAbilitiesQueryDto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get('abilities')
  async findAllAbilities(@Query() query: FindAllAbilitiesQueryDto) {
    const limit = query.limit ? parseInt(query.limit, 10) : 60;
    const offset = query.offset ? parseInt(query.offset, 10) : 0;

    return await this.pokemonsService.findAllAbilities(limit, offset);
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.pokemonsService.findOnePokemon(name);
  }
}