import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SectionScreenCoverage} from "../../models/section-screen-coverage.model";
import {SectionScrollOffsetPercentageModel} from "../../models/section-scroll-offset-percentage.model";

@Component({
  selector: 'lf-quick-nav',
  templateUrl: './quick-nav.component.html',
  styleUrls: [ './quick-nav.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class QuickNavComponent {
  @Input() sectionScreenCoverage: SectionScreenCoverage = {};
  @Input() sectionScrollOffsetPercentage: SectionScrollOffsetPercentageModel = {};
  @Input() quickNavTitles: { aboutme: string, entry: string, contact: string, projects: string} = null;
  @Output() currentSectionChange: EventEmitter<'about-me' | 'contact' | 'entry' | 'projects'>
    = new EventEmitter<'about-me' | 'contact' | 'entry' | 'projects'>();

  goToSection(section: 'about-me' | 'contact' | 'entry' | 'projects') {
    this.currentSectionChange.emit(section);
  }
}
