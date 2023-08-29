import {Component} from '@angular/core';
import {Pit} from "../../model/pit.model";

@Component({
  selector: 'app-ouril',
  templateUrl: './ouril.component.html'
})
export class OurilComponent {

  clickCounter: number = 0;

  private pits: Pit[] = Array(12)
    .fill({index: 0, value: 4})
    .map(((pit, index) => ({...pit, index})));

  get pitsReordered() {
    return [...this.pits.slice(6, 12).reverse(), ...this.pits.slice(0, 6)]
  }

  onSelectPit(index: number): void {
    const pit = this.getPit(index);
    let peas = 0;
    if (pit) {
      peas = pit.value || 0;
      pit.value = 0;
    }
    if (peas > 0) {
      this.clickCounter++;
    }
    while (peas > 0) {
      index = index === this.pits.length - 1 ? 0 : (index + 1)
      let currentPit = this.getPit(index);
      if (currentPit) {
        currentPit.value++;
        peas--;
      }
    }
  }

  private getPit(index: number): Pit | undefined {
    return this.pits.find(pit => pit.index === index);
  }
}
