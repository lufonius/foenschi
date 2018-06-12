import {Component, Input} from '@angular/core';

@Component({
  selector: 'lf-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss']
})
export class SubsectionComponent {
  @Input() title: string = "";
  @Input() description: string = "";
}
