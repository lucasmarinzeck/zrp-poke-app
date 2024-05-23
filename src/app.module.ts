import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [PokemonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
