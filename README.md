## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Using [poke api](https://pokeapi.co/) this project aims to create an interface to view abilities sorted in alphabetical order with a simple caching strategy of 15 milliseconds.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Acess the view on your browser http://localhost:3000/pokemons/view/abilities

## Running on Docker

```bash
# build the image based on dockerfile on this project
$ docker build -t zrp-poke-app -f dockerfile.yaml .

# run the docker image
$ docker build -t zrp-poke-app -f dockerfile.yaml .
```

Acess the view on your browser http://localhost:3000/pokemons/view/abilities

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## Stay in touch

[Lucas Marinzeck](https://www.linkedin.com/in/lucasmarinzeck/)
