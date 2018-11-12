import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../models/project.view-model";
import * as _ from 'lodash';
import {ProjectBlock} from "../../models/project-block.view-model";
import {ProjectDetailPage} from "../../models/project-detail-page.view-model";
import {animate, animateChild, group, query, sequence, state, style, transition, trigger} from "@angular/animations";

const EASE_IN_OUT_CIRC = 'cubic-bezier(0.075, 0.82, 0.165, 1)';

@Component({
  selector: 'lf-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pageStateInfo', [
      state('info', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('gallery', style({
        transform: 'scale(2)',
        opacity: 0
      })),
      transition('info => gallery', animate(`300ms ${EASE_IN_OUT_CIRC}`))
    ]),
    trigger('pageStateGallery', [
      state('info', style({
        filter: 'blur(5px)',
        'background-color': 'rgba(255, 255, 255, 0.7)'
      })),
      state('gallery', style({
        filter: 'blur(0px)',
        'background-color': 'rgba(255, 255, 255, 0)'
      })),
      transition('info <=> gallery', animate(`300ms ${EASE_IN_OUT_CIRC}`))
    ]),
    trigger('pageStateOverlay', [
      state('info', style({
        'background-color': 'rgba(255, 255, 255, 0.7)',
        display: 'block'
      })),
      state('gallery', style({
        'background-color': 'rgba(255, 255, 255, 0)',
        display: 'none'
      })),
      transition('info <=> gallery', animate(`300ms ${EASE_IN_OUT_CIRC}`))
    ]),
    trigger('pageStateWrapper', [
      state('info', style({
        display: 'block'
      })),
      state('gallery', style({
        display: 'none'
      })),
      transition('info <=> gallery', animate(`300ms ${EASE_IN_OUT_CIRC}`))
    ]),
    trigger('pageStateControls', [
      state('info', style({
        opacity: 0,
        display: 'none'
      })),
      state('gallery', style({
        opacity: 1,
        display: 'block'
      })),
      transition('info <=> gallery', animate(`300ms ${EASE_IN_OUT_CIRC}`))
    ])
  ]
})
export class ProjectDetailComponent implements OnInit {

  @Input() projectDetailPage: ProjectDetailPage = null;
  @Input() projectExists: boolean = true;
  @Input() activeProjectBlock: ProjectBlock = null;
  @Output() activeProjectBlockChange = new EventEmitter();
  @Input() pageState: 'gallery' | 'info' = 'info';
  @Output() pageStateChange = new EventEmitter();

  public zoom: number = 100;

  constructor() { }

  ngOnInit() {
  }

  order(blocks: ProjectBlock[]) {
    return _.orderBy(blocks, 'order', 'asc');
  }

  getBackgroundStyle(imageUrl: string) {
    return `url(${imageUrl})`;
  }

  pageStateChanged(state) {
    this.pageStateChange.emit(state);
  }

  zoomChanged(zoom) {
    this.zoom = zoom;
  }

  closeGallery() {
    this.pageStateChange.emit('info');
  }

  activeProjectBlockChanged(block) {
    this.activeProjectBlockChange.emit(block);
  }

  onPinch(event) {
    console.log(event);
  }

  hasImage(imageUrl: string) {
    return !!imageUrl;
  }
}
