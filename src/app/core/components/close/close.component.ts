import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

const EASE_IN_OUT_BACK = "cubic-bezier(0.68, -0.55, 0.265, 1.55)";

@Component({
  selector: 'lf-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss'],
  animations: [

  ]
})
export class CloseComponent {
  public visibilityState: 'visible' | 'invisible' = 'invisible';

  @Input() set visible(visible: boolean) {
    console.log(visible);
    if(visible) {
      this.visibilityState = 'visible';
    } else {
      this.visibilityState = 'invisible';
    }
  }

  @Output() closeClicked: EventEmitter<void> = new EventEmitter<void>();

  closeClick() {
    this.closeClicked.emit();
  }
}
