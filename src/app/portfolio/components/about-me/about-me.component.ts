import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BaseSection } from "../base-section";
import {AboutMeSubsection} from "../../models/about-me-subsection.view-model";
import {BaseSectionPosition} from "../base-section-position";

@Component({
  selector: 'lf-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})

export class AboutMeComponent extends BaseSectionPosition {

  @Input() subsections: AboutMeSubsection[] = [];
  @Input() currentLanguage: string = null;
}
