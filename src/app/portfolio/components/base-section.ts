import {ElementRef, EventEmitter, Input, Output} from "@angular/core";

export class BaseSection {

  @Input() isFirstSection: boolean = false;
  @Input() isLastSection: boolean = false;
  @Input() showBackground: boolean = true;

  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() background: string = "";

  @Output() goToNextSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() goToPreviousSection: EventEmitter<void> = new EventEmitter<void>();

  emitGoToNextSection() {
    this.goToNextSection.emit();
  }

  emitGoToPreviousSection() {
    this.goToPreviousSection.emit();
  }
}
