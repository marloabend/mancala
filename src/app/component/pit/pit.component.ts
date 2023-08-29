import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pit} from "../../model/pit.model";

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss']
})
export class PitComponent {
  @Input() pit: Pit;
  @Output() selectPit = new EventEmitter<number>();
}
