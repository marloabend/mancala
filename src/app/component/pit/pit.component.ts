import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PitComponent {

  @Input() disabled = false;
  @Input() value: number;

  @Output() selectPit = new EventEmitter<void>();

  get valueArray(): number[] {
    return Array(this.value || 0)
      .fill(null)
      .map((_, i) => i)
  }

  onClick(): void {
    if (!this.disabled) {
      this.selectPit.emit();
    }
  }
}
