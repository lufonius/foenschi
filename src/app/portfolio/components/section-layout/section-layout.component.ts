import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {BaseSection} from "../base-section";
import {BaseSectionPosition} from "../base-section-position";

@Component({
  selector: 'lf-section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss']
})
export class SectionLayoutComponent extends BaseSection {

  constructor() {
    super();
  }

  getBackgroundUrl() {
    return `url(${this.background})`;
  }
}
