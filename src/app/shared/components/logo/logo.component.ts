import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'lf-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input() currentLanguage: string = null;

  constructor(public router: Router) {

  }

  navigateToFront() {
    if(this.currentLanguage) {
      this.router.navigate([`${this.currentLanguage}/portfolio/front`]);
    }
  }
}
