import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseSection } from '../base-section';

@Component({
  selector: 'lf-section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionLayoutComponent extends BaseSection {
  constructor() {
    super();
  }

  getBackgroundUrl() {
    return `url(${this.background})`;
  }
}
