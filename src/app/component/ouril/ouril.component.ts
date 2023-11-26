import {Component} from '@angular/core';
import {Ouril} from './ouril';
import {Player} from './type/player.type';
import {Stats} from './model/player-stats.model';
import {Variant} from './type/variant.type';
import {Pit} from './model/pit.model';
import {PitComponent} from '../pit/pit.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ouril',
  templateUrl: './ouril.component.html',
  styleUrls: ['./ouril.component.scss'],
  standalone: true,
  imports: [CommonModule, PitComponent]
})
export class OurilComponent {

  variant: Variant = 'default';
  game: Ouril;
  pits: { [key in Player]: Pit[] };
  currentPlayer: Player;
  stats: Stats;
  validMoves: number[];

  constructor() {
    this.initGame();
  }

  onMove(pit: Pit): void {
    this.game.move(pit.getIndex());
    this.updateStateDisplay();
  }

  onReset(): void {
    this.initGame();
  }

  private initGame(): void {
    this.game = new Ouril(this.variant);
    this.updateStateDisplay();
  }

  private updateStateDisplay(): void {
    this.pits = {
      A: this.game.getPits('A'),
      B: this.game.getPits('B').reverse()
    };
    this.currentPlayer = this.game.getCurrentPlayer();
    this.stats = this.game.getStats();
    this.validMoves = this.game.getValidMoves();
  }
}
