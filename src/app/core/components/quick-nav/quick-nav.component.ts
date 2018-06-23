import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SectionScreenCoverage} from "../../models/section-screen-coverage.model";
import {SectionScrollOffsetPercentageModel} from "../../models/section-scroll-offset-percentage.model";

@Component({
  selector: 'lf-quick-nav',
  templateUrl: './quick-nav.component.html',
  styleUrls: ['./quick-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuickNavComponent {

  @Input() sectionScreenCoverage: SectionScreenCoverage = {};
  @Input() sectionScrollOffsetPercentage: SectionScrollOffsetPercentageModel = {};

}
