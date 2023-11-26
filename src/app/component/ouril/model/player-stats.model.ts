import {Player} from '../type/player.type';

type PlayerStats = {
  [key in Player]: {
    player: Player;
    moves: number;
    score: number;
    wins: boolean;
  };
};

export class Stats {

  private readonly moveHistory: number[] = [];
  private readonly playerStats: PlayerStats = (['A', 'B'] as Player[]).reduce((stats, player) => {
    stats[player] = {player, moves: 0, score: 0, wins: false}
    return stats
  }, {} as PlayerStats);

  get player(): PlayerStats {
    return this.playerStats
  }

  get moves(): number {
    return (['A', 'B'] as Player[]).reduce((sum, player) => sum + this.playerStats[player].moves, 0);
  }

  get history(): number[] {
    return this.moveHistory;
  }

  get winner(): Player | null {
    return (['A', 'B'] as Player[]).find(player => this.playerStats[player].wins) || null;
  }

  raiseMoves(player: Player): void {
    if (this.playerStats[player]) {
      this.playerStats[player].moves++;
    }
  }

  raiseScore(player: Player, amount: number): void {
    if (this.playerStats[player]) {
      this.playerStats[player].score = this.playerStats[player].score + amount;
      this.playerStats[player].wins = this.playerStats[player].score >= 25;
    }
  }

  addToHistory(index: number): void {
    this.moveHistory.push(index);
  }
}
