import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseSectionPosition} from "../base-section-position";

@Component({
  selector: 'lf-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent extends BaseSectionPosition {
  @Input() saying: string = "";
  @Input() nextSectionText: string = "";

  getBackgroundUrl() {
    return `url(${this.background})`;
  }

}
