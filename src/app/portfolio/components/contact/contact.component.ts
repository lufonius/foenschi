import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { BaseSection } from "../base-section";
import {BaseSectionPosition} from "../base-section-position";

@Component({
  selector: 'lf-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseSectionPosition {

  @Input() namePlaceholder: string = "";
  @Input() subjectPlaceholder: string = "";
  @Input() emailPlaceholder: string = "";
  @Input() messagePlaceholder: string = "";
  @Input() submitButtonText: string = "";
}
