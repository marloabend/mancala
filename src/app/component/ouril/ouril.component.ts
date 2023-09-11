import {Component} from '@angular/core';
import {Ouril} from './ouril';
import {Player} from './type/player.type';
import {PlayerStats} from './model/player-stats.model';
import {Variant} from './type/variant.type';
import {Pit} from './model/pit.model';
import {PitComponent} from '../pit/pit.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ouril',
  templateUrl: './ouril.component.html',
  standalone: true,
  imports: [CommonModule, PitComponent]
})
export class OurilComponent {

  variant: Variant = 'default';
  game: Ouril;

  constructor() {
    this.initGame();
  }

  get currentPlayer(): Player {
    return this.game.getCurrentPlayer();
  };

  get stats(): Map<Player, PlayerStats> {
    return this.game.getStats();
  }

  get movesOverall(): number {
    return this.game.getMoves('A') + this.game.getMoves('B');
  }

  getPits(player: Player, reverse: boolean = false): Pit[] {
    return this.game.getPits(player, reverse);
  }

  onSelectPit(index: number): void {
    this.game.move(index);
  }

  onReset(): void {
    this.initGame();
  }

  private initGame(): void {
    this.game = new Ouril(this.variant);
  }
}
