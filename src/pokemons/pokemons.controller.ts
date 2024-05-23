import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Render,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { FindAllAbilitiesQueryDto } from './dtos/FindAllAbilitiesQueryDto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get('view/abilities')
  @Render('index')
  async root(@Query() query: FindAllAbilitiesQueryDto) {
    try {
      const limit = query.limit ? parseInt(query.limit, 10) : 367;
      const offset = query.offset ? parseInt(query.offset, 10) : 0;

      const result = await this.pokemonsService.findAllAbilities(limit, offset);

      return { abilities: result };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('view/ability/:id')
  @Render('ability')
  async viewAbility(@Param('id') id: string) {
    try {
      const ability = await this.pokemonsService.findAbility(id);
      return ability;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/api/abilities')
  async findAllAbilities(@Query() query: FindAllAbilitiesQueryDto) {
    try {
      const limit = query.limit ? parseInt(query.limit, 10) : 367;
      const offset = query.offset ? parseInt(query.offset, 10) : 0;

      return await this.pokemonsService.findAllAbilities(limit, offset);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/api/ability/:id')
  async getAbility(@Param('id') id: string) {
    try {
      return this.pokemonsService.findAbility(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
