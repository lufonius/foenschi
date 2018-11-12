import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectBlock} from "../../models/project-block.view-model";
import * as _ from 'lodash';

@Component({
  selector: 'lf-gallery-controls',
  templateUrl: './gallery-controls.component.html',
  styleUrls: ['./gallery-controls.component.scss']
})
export class GalleryControlsComponent implements OnInit {

  @Input() projectBlocks: ProjectBlock[] = [];
  @Input() activeBlock: ProjectBlock = null;
  @Output() activeBlockChange = new EventEmitter();
  @Output() zoomChange = new EventEmitter();
  @Output() closeClicked = new EventEmitter();

  @Input() zoom: number = 100;

  ngOnInit() {
  }

  nextBlock() {
    let activeIndex = this.getActiveIndex();

    this.activeBlockChange.emit(this.projectBlocks[activeIndex + 1]);
  }

  previousBlock() {
    let activeIndex = this.getActiveIndex();

    this.activeBlockChange.emit(this.projectBlocks[activeIndex - 1]);
  }

  getActiveIndex(): number {
    return _.findIndex(this.projectBlocks, item => item.id === this.activeBlock.id);
  }

  goToBlock(block) {
    this.activeBlockChange.emit(block);
  }

  zoomChanged() {
    this.zoomChange.emit(this.zoom);
  }

  close() {
    this.closeClicked.emit();
  }

  isActiveBlockFirst(activeBlock) {
    return activeBlock.id === this.projectBlocks[0].id;
  }

  isActiveBlockLatest(activeBlock) {
    return activeBlock.id === this.projectBlocks[this.projectBlocks.length - 1].id;
  }

}
