import {Component} from '@angular/core';
import {Ouril} from './ouril';
import {Player} from './type/player.type';
import {Stats} from './model/player-stats.model';
import {Variant} from './type/variant.type';
import {Pit} from './model/pit.model';
import {PitComponent} from '../pit/pit.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ouril',
  templateUrl: './ouril.component.html',
  styleUrls: ['./ouril.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, PitComponent]
})
export class OurilComponent {

  variant: Variant = 'default';
  game: Ouril;
  pits: { [key in Player]: Pit[] };
  currentPlayer: Player;
  stats: Stats;
  validMoves: number[];
  autoMovesString = '';
  autoMoveLoopTime = 500;
  autoMoveInterval!: any;

  constructor() {
    this.initGame();
  }

  onMove(pit: Pit): void {
    this.stopAutoMove();
    this.move(pit.getIndex());
  }

  onPlayAutoMoves(): void {
    const moves = this.autoMovesString
      .split(',')
      .map(indexString => indexString.trim())
      .filter(indexString => indexString)
      .map(indexString => +indexString)
      .filter(index => !isNaN(index));

    if (moves.length) {
      this.startAutoMove(moves);
    }
  }

  onStopAutoMoves(): void {
    this.stopAutoMove();
  }

  onReset(): void {
    this.initGame();
  }

  private initGame(): void {
    this.stopAutoMove();
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

  private move(index: number): void {
    this.game.move(index);
    this.updateStateDisplay();
  }

  private startAutoMove(moves: number[]): void {
    if (!moves.length) {
      return;
    }
    this.initGame();
    let index = 0;
    this.autoMoveInterval = setInterval(() => {
      console.warn('auto move (', index + 1, '/', moves.length, ') pit', moves[index]);
      this.move(moves[index]);
      index++;
      if (index >= moves.length) {
        this.stopAutoMove();
      }
    }, this.autoMoveLoopTime);
  }

  private stopAutoMove(): void {
    clearInterval(this.autoMoveInterval);
  }
}
