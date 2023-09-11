import {Pit} from './model/pit.model';
import {Player} from './type/player.type';
import {PlayerStats} from './model/player-stats.model';
import {Variant} from './type/variant.type';

export class Ouril {

  private readonly variant: Variant;
  private readonly pits: Pit[];
  private readonly stats: Map<Player, PlayerStats>;
  private currentPlayer: Player;

  constructor(variant: Variant = 'default') {
    this.variant = variant;
    this.pits = Ouril.emptyPits(this.variant === 'kids' ? 8 : 12);
    this.currentPlayer = 'A';
    this.stats = new Map((['A', 'B'] as Player[]).map(player => [player, Ouril.emptyStats(player)]));
  }

  private static emptyPits(count: number): Pit[] {
    return Array(count)
      .fill({index: 0, value: 4})
      .map(((pit, index) => ({...pit, index})));
  }

  private static emptyStats(player: Player): PlayerStats {
    return {player, moves: 0, score: 0};
  }

  getVariant(): Variant {
    return this.variant;
  }

  getPits(player?: Player, reverse = false): Pit[] {
    let pits = this.pits;
    if (player) {
      const numPits = this.pits.length;
      const sliceStart = player === 'A' ? 0 : numPits / 2;
      const sliceEnd = player === 'A' ? numPits / 2 : numPits;
      pits = pits.slice(sliceStart, sliceEnd);
    }
    return reverse ? pits.reverse() : pits;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getStats(): Map<Player, PlayerStats> {
    return this.stats;
  }

  getMoves(player: Player): number {
    return this.stats.get(player)?.moves || 0;
  }

  getScore(player: Player): number {
    return this.stats.get(player)?.score || 0;
  }

  move(index: number): void {
    const pit = this.getPit(index);
    if (!pit) {
      return;
    }

    let peas = pit.value || 0;
    if (peas <= 0 || !this.isOwnPit(pit)) {
      return;
    }

    pit.value = 0;
    this.raiseMoves(this.currentPlayer);

    let skipFirstPut = peas > 11;
    let currentPit;

    while (peas > 0) {
      index = index === this.pits.length - 1 ? 0 : index + 1;

      currentPit = this.getPit(index);
      if (!currentPit) {
        break;
      }

      if (skipFirstPut && currentPit.index === pit.index) {
        skipFirstPut = false;
        continue;
      }

      currentPit.value++;
      peas--;
    }

    if (!currentPit) {
      return;
    }

    while (this.isWinningPit(currentPit)) {
      this.raiseScore(this.currentPlayer, currentPit.value);
      currentPit.value = 0;

      if (this.getScore(this.currentPlayer) >= 25) {
        alert(this.currentPlayer + ' wins!!!');
      }

      index = index === 0 ? this.pits.length - 1 : index - 1;
      currentPit = this.getPit(index);
      if (!currentPit) {
        break;
      }
    }

    this.changePlayer();
  }

  private getPit(index: number): Pit | undefined {
    return this.pits.find(pit => pit.index === index);
  }

  private isOwnPit(pit: Pit): boolean {
    return this.getPits(this.currentPlayer)?.includes(pit) || false;
  }

  private isWinningPit(pit: Pit): boolean {
    return !this.isOwnPit(pit) && (pit.value === 2 || pit.value === 3);
  }

  private changePlayer(): void {
    this.currentPlayer = this.currentPlayer === 'A' ? 'B' : 'A';
  }

  private raiseMoves(player: Player): void {
    const stats = this.stats.get(player) || Ouril.emptyStats(player);
    this.stats.set(player, {...stats, moves: stats.moves + 1});
  }

  private raiseScore(player: Player, amount: number): void {
    const stats = this.stats.get(player) || Ouril.emptyStats(player);
    this.stats.set(player, {...stats, score: stats.score + amount});
  }
}

