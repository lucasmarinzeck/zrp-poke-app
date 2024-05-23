import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemons/api/abilities (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemons/api/abilities')
      .expect(200)
      .expect((res) => {
        if (res.body.length !== 367) {
          throw new Error(
            `Expected response length to be 367, but got ${res.body.length}`,
          );
        }
      });
  });

  it('/pokemons/api/ability/:id (GET)', () => {
    const lightningRodMock = {
      id: 31,
      name: 'lightning-rod',
      shortEffect:
        'Redirects single-target electric moves to this Pokémon where possible.  Absorbs Electric moves, raising Special Attack one stage.',
      effect: 'Draws electrical moves.',
    };

    return request(app.getHttpServer())
      .get('/pokemons/api/ability/31')
      .expect(200)
      .expect(lightningRodMock);
  });
});
