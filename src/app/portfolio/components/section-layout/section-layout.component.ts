import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'lf-section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss']
})
export class SectionLayoutComponent implements AfterViewInit {

  @Output() sectionPosition: EventEmitter<{x: number, y: number}> = new EventEmitter<{x: number, y: number}>();
  @Input() isFirstSection: boolean = false;
  @Input() isLastSection: boolean = false;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    let x: number = this.element.nativeElement.offsetLeft;
    let y: number = this.element.nativeElement.offsetTop;

    this.sectionPosition.emit({x, y});
  }
}
