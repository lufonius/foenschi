import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lf-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  @Input() isFirstElement: boolean = false;
  @Input() isLastElement: boolean = false;


}
