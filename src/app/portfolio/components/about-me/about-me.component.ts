import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AboutMeSubsection } from '../../models/about-me-subsection.view-model';
import { BaseSectionPosition } from '../base-section-position';

@Component({
  selector: 'lf-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent extends BaseSectionPosition {
  @Input() subsections: AboutMeSubsection[] = [];
  @Input() currentLanguage: string = null;
}
