import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lf-navigation-element',
  templateUrl: './navigation-element.component.html',
  styleUrls: ['./navigation-element.component.scss']
})
export class NavigationElementComponent {

  @Input() title: string = "title";
  @Input() subtitle: string = "subtitle";
  @Input() isActive: boolean = false;
  @Input() hasChildren: boolean = false;
  @Input() route: string = null;

  @Output() navigationElementClicked: EventEmitter<void> = new EventEmitter<void>();

  navigationElementClick() {
    this.navigationElementClicked.emit();
  }

}
