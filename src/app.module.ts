import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ ttl: 15000, isGlobal: true }),
    PokemonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
