import {Ouril} from './ouril';

describe('Ouril', () => {

  let game: Ouril;

  beforeEach(() => {
    game = new Ouril();
  });

  it('should create new game', () => {
    expect(game).toBeTruthy();
  });

  it('should have correct amount of pits in default mode', () => {
    expect(game.getVariant()).toEqual('default');
    expect(game.getPits()?.length).toEqual(12)
    expect(game.getPits('A')?.length).toEqual(6)
    expect(game.getPits('B')?.length).toEqual(6)
  });

  it('should have correct amount of pits in kids mode', () => {
    game = new Ouril('kids');
    expect(game.getVariant()).toEqual('kids');
    expect(game.getPits()?.length).toEqual(8);
    expect(game.getPits('A')?.length).toEqual(4);
    expect(game.getPits('B')?.length).toEqual(4);
  });

  it('should play simple move correctly', () => {
    game.move(0);
    const pits = game.getPits();
    expect(pits[0].getValue()).toEqual(0);
    expect(pits[1].getValue()).toEqual(5);
    expect(pits[2].getValue()).toEqual(5);
    expect(pits[3].getValue()).toEqual(5);
    expect(pits[4].getValue()).toEqual(5);
    expect(pits[5].getValue()).toEqual(4);
  })
});


/*
Possbile test cases

A wins
[53]: 0,6,1,7,2,8,0,10,3,6,4,9,5,11,1,10,2,7,3,8,0,9,4,6,1,11,4,10,2,6,3,9,0,8,4,7,5,10,3,11,4,9,0,11,5,8,2,6,3,10,1,11,4
[23]: 3,7,4,8,2,9,1,10,2,11,0,7,4,6,3,6,5,10,1,11,2,7,4
[23]: 2,6,1,9,3,8,0,7,4,10,1,9,2,8,3,10,0,9,1,10,3,11,5 (Exactly with 25 leaving only one possible move)

B wins
[44] 1,10,0,11,1,9,2,8,3,9,4,7,5,8,1,10,2,11,5,6,4,9,3,7,5,10,1,11,0,6,1,9,3,8,2,10,4,7,1,8,0,9,1,11

A must feed after own move
A must feed after own move but cant

A must feed after opponent move
A must feed after opponent move but cant

B must feed after own move
[30] 2,10,1,11,0,9,3,9,2,8,4,7,2,9,0,6,5,8,3,10,1,11,2,9,3,10,4,7,5,6

B must feed after own move but cant
[44] 5,11,4,6,0,6,5,7,3,9,2,9,1,7,5,10,3,8,3,11,5,6,4,10,2,7,5,9,1,6,5,6,4,11,5,10,3,9,0,8,4,7,5,11

B must feed after opponent move
B must feed after opponent move but cant
*/
