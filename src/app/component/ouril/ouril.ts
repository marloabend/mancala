import {Pit} from '../../model/pit.model';
import {Player} from '../../type/player.type';
import {Stats} from "../../model/player-stats.model";

export type Variant = 'default' | 'kids';

export class Ouril {

  private readonly variant: Variant;
  private readonly pits: Pit[];
  private readonly stats: Stats;
  private currentPlayer: Player;

  constructor(variant: Variant = 'default') {
    this.variant = variant;
    this.pits = Pit.emptyPits(Ouril.pitCount(variant));
    this.currentPlayer = 'A';
    this.stats = new Stats();
  }

  private static pitCount(variant: Variant): number {
    return variant === 'kids' ? 8 : 12;
  }

  getVariant(): Variant {
    return this.variant;
  }

  getPits(player?: Player): Pit[] {
    if (player === 'A') {
      return this.pits.slice(0, this.pits.length / 2);
    } else if (player === 'B') {
      return this.pits.slice(this.pits.length / 2);
    }
    return this.pits;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getStats(): Stats {
    return this.stats;
  }

  getValidMoves(player = this.currentPlayer): number[] {
    return this.getPits(player)
      .filter(pit => this.isValidMove(pit.getIndex(), player))
      .map(pit => pit.getIndex());
  }

  isValidMove(index: number, player: Player = this.currentPlayer): boolean {
    const pit = this.pits[index];
    const mustFeed = this.playerPitsEmpty(this.opponent(player));

    return !this.stats.winner && this.isOwnPit(pit, player) && !pit?.isEmpty() && (!mustFeed || this.isFeedingPit(pit));
  }

  move(index: number): void {
    if (!this.isValidMove(index)) {
      return;
    }

    let pit = this.pits[index];
    if (!pit) {
      return;
    }

    this.stats.raiseMoves(this.currentPlayer);
    this.stats.addToHistory(index);

    // Sowing
    let seeds = pit.collect();
    let skipFirstSowing = seeds > 11 ? index : null;

    while (seeds > 0) {
      index = index === this.pits.length - 1 ? 0 : index + 1;
      pit = this.pits[index];

      if (index === skipFirstSowing) {
        skipFirstSowing = null;
        continue;
      }

      pit.put(1);
      seeds--;
    }

    // Capturing
    while (!this.isOwnPit(pit) && (pit.getValue() === 2 || pit.getValue() === 3)) {
      this.stats.raiseScore(this.currentPlayer, pit.collect());

      index = index === 0 ? this.pits.length - 1 : index - 1;
      pit = this.pits[index];
    }

    if (this.stats.winner) {
      return;
    }

    if (this.playerPitsEmpty()) {
      if (this.canMove(this.opponent())) {
        this.currentPlayer = this.opponent();
      } else {
        this.captureAll(this.opponent());
      }
    } else if (this.playerPitsEmpty(this.opponent())) {
      if (this.canMove()) {
        return;
      } else {
        this.captureAll();
      }
    } else {
      this.currentPlayer = this.opponent();
    }
  }

  private playerPitsEmpty(player: Player = this.currentPlayer): boolean {
    return this.getPits(player).reduce((sum, pit) => sum + pit.getValue(), 0) <= 0;
  }

  private canMove(player: Player = this.currentPlayer): boolean {
    return this.getPits(player).some(pit => this.isValidMove(pit.getIndex(), player));
  }

  private captureAll(player: Player = this.currentPlayer): void {
    this.getPits(player).forEach(pit => this.stats.raiseScore(player, pit.collect()));
  }

  private isFeedingPit(pit: Pit): boolean {
    return pit.getIndex() % (this.pits.length / 2) + pit.getValue() >= (this.pits.length / 2);
  }

  private isOwnPit(pit: Pit, player: Player = this.currentPlayer): boolean {
    return this.getPits(player)?.includes(pit) || false;
  }

  private opponent(player: Player = this.currentPlayer): Player {
    return player === 'A' ? 'B' : 'A';
  }
}
