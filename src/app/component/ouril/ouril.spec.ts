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
