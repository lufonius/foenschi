import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/index';
import {
  LoadProjectDetailPageAction,
  ProjectDetailPageStateAction,
  SetActiveProjectBlockAction
} from '../actions/project-detail-page.actions';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailPage } from '../models/project-detail-page.view-model';
import { ProjectBlock } from '../models/project-block.view-model';

@Component({
  selector: 'lf-project-detail-page',
  template: `
    <lf-project-detail
      [projectDetailPage]="projectDetailPageState$ | async"
      [pageState]="projectDetailPagePageState$ | async"
      [activeProjectBlock]="activeProjectBlockState$ | async"
      (activeProjectBlockChange)="activeProjectBlockChanged($event)"
      (pageStateChange)="pageStateChanged($event)"
    ></lf-project-detail>
  `
})
export class ProjectDetailPageComponent implements OnInit, OnDestroy {
  public projectDetailPageState$: Observable<ProjectDetailPage>;
  public projectDetailPagePageState$: Observable<'gallery' | 'info'>;
  public activeProjectBlockState$: Observable<ProjectBlock>;
  public projectExists: boolean = false;
  public paramSubscription: Subscription;

  constructor(public store: Store<fromRoot.State>, public activatedRoute: ActivatedRoute) {
    this.projectDetailPageState$ = this.store.select(fromRoot.getProjectDetailPageState);
    this.projectDetailPagePageState$ = this.store.pipe(select(fromRoot.getProjectDetailPagePageState));
    this.activeProjectBlockState$ = this.store.pipe(select(fromRoot.getActiveProjectBlock));
    this.store.dispatch(new ProjectDetailPageStateAction({ state: 'info' }));
  }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      let projectId = params['id'];
      if (projectId) {
        this.store.dispatch(new LoadProjectDetailPageAction({ projectId: projectId }));
        this.store.dispatch(new ProjectDetailPageStateAction({ state: 'info' }));
        this.projectExists = true;
      } else {
        this.projectExists = true;
      }
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  pageStateChanged(state: 'gallery' | 'info') {
    this.store.dispatch(new ProjectDetailPageStateAction({ state: state }));
  }

  activeProjectBlockChanged(block) {
    this.store.dispatch(new SetActiveProjectBlockAction({ activeBlock: block }));
  }
}
