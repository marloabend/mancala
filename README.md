# Mancala

This project is the result of a coding challenge. The goal was to implement a Mancala game, specifically the [Ouril](https://de.wikipedia.org/wiki/Ouril) variant from Cape Verde.

It was set up using Angular as famework. The game logic is implemented in an object-oriented manner using vanilla TypeScript while the individual pits visualize the number of currently contained seeds using d3.js and its circle packing algorithm including a physics simulation. The layout of the game is realized using Angular components and Bootstrap.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Potential TODOs could include:

- Implementing additional Mancala variants from other countries, such as [Oware](https://de.wikipedia.org/wiki/Oware) (with a focus on sharing as much logic as possible)
- More detailed visualization of the game field, such as a move preview or summation of currently contained seeds in a pit
- Improved resizing behavior
- Saving game state between reloads
- Sound effects (SFX)
- Progressive Web App (PWA) capabilities
- Online matches
- ...
