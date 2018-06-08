import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lf-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  @Output() sectionPosition: EventEmitter<{x: number, y: number}> = new EventEmitter<{x: number, y: number}>();

  emitSectionPosition(position) {
    this.sectionPosition.emit(position);
  }
}
