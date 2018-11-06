import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers';
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs/index";
import {Project} from "../models/project.view-model";
import {LoadProjectDetailPageAction} from "../actions/project-detail-page.actions";
import {ActivatedRoute} from "@angular/router";
import {ProjectDetailPage} from "../models/project-detail-page.view-model";

@Component({
  selector: 'lf-project-detail-page',
  template: `
    <lf-project-detail [projectDetailPage]="projectDetailPageState$ | async"></lf-project-detail>
  `
})
export class ProjectDetailPageComponent implements OnInit, OnDestroy {

  public projectDetailPageState$: Observable<ProjectDetailPage>;
  public projectExists: boolean = false;
  public paramSubscription: Subscription;

  constructor(public store: Store<fromRoot.State>, public activatedRoute: ActivatedRoute) {
    this.projectDetailPageState$ = this.store.select(fromRoot.getProjectDetailPageState);
  }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      let projectId = params['id'];
      if(projectId) {
        this.store.dispatch(new LoadProjectDetailPageAction({ projectId: projectId }));
        this.projectExists = true;
      } else {
        this.projectExists = true;
      }
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
