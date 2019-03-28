import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lf-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubsectionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '';
  @Input() currentLanguage: string = null;

  navigate(route: string) {
    this.router.navigate([`${this.currentLanguage}/${route}`]);
  }

  constructor(public router: Router) {
  }
}
