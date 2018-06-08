import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lf-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() color: string = 'rgba(255,255,255,1)';

}