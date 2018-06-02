import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'lf-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent {

  @Output() onBurgerClick = new EventEmitter();

  burgerClicked() {
    this.onBurgerClick.emit();
  }
}
