import {ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'lf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  @Input() mode: string = null;
  @Input() showQuickNav: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
