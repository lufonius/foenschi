import {
  Component,
  EventEmitter, Input,
  Output, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'lf-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BurgerComponent {

  @Output() onBurgerClick = new EventEmitter<{x: number, y: number}>();
  @Input() backgroundColor: string = 'rgba(255,255,255,1)';

  burgerClicked(event) {
    this.onBurgerClick.emit(event);
  }
}
