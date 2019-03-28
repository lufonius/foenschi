import { EventEmitter, Input, Output } from '@angular/core';

export class BaseSection {
  //okay, better would be if the section layout component had some subcomponents, which renders to the right
  //place, but thats overkill for now
  /*
   * <lf-section-layout>
   *     <lf-header [title]="..."></lf-header>
   *     content
   * </lf-section-layout>
   * */
  @Input() showHeader: boolean = true;

  @Input() isFirstSection: boolean = false;
  @Input() isLastSection: boolean = false;
  @Input() showBackground: boolean = true;

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() background: string = '';

  @Input() placeInOrder: string = null;

  @Output() goToNextSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() goToPreviousSection: EventEmitter<void> = new EventEmitter<void>();

  emitGoToNextSection() {
    this.goToNextSection.emit();
  }

  emitGoToPreviousSection() {
    this.goToPreviousSection.emit();
  }
}
