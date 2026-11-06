import {Component} from '@angular/core';
import {OurilComponent} from "./component/ouril/ouril.component";

@Component({
  imports: [OurilComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
