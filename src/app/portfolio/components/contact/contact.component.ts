import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseSectionPosition } from '../base-section-position';

@Component({
  selector: 'lf-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent extends BaseSectionPosition {
  @Input() namePlaceholder: string = '';
  @Input() subjectPlaceholder: string = '';
  @Input() emailPlaceholder: string = '';
  @Input() messagePlaceholder: string = '';
  @Input() submitButtonText: string = '';
  @Input() warning: string = '';
  @Input() email: string = '';
}
