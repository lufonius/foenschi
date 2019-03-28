import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[lfScreenCoverage]' })
export class ScreenCoverageDirective implements AfterViewInit {
	@Output() screenCoverage: EventEmitter<number> = new EventEmitter<number>();

	public position: { x: number; y: number } = { x: 0, y: 0 };
	public dimension: { width: number; height: number } = { width: 0, height: 0 };
	public screenDimension: { width: number; height: number } = { width: 0, height: 0 };

	constructor(public element: ElementRef) {}

	@HostListener('window:scroll', ['$event']) onScroll() {
		let scrollPosition = { x: window.pageXOffset, y: window.pageYOffset };

		let coveragePx = this.screenDimension.height - Math.abs(this.position.y - scrollPosition.y);

		let coverage = (coveragePx * 100) / this.screenDimension.height;

		this.screenCoverage.emit(coverage);
	}

	ngAfterViewInit() {
		this.position.x = this.element.nativeElement.offsetLeft;
		this.position.y = this.element.nativeElement.offsetTop;

		this.dimension.height = this.element.nativeElement.clientHeight;
		this.dimension.width = this.element.nativeElement.clientWidth;

		this.screenDimension.height = window.innerHeight;
		this.screenDimension.width = window.innerWidth;
	}
}
