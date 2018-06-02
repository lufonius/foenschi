import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import { ToggleNavVisibilityAction } from "../../actions/layout.actions";
import { State } from "../../../reducers";
import { Observable } from "rxjs/index";
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'lf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private navVisibility$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.navVisibility$ = store.pipe(select(fromRoot.getNavVisibilityState));
  }

  ngOnInit() {

  }

  toggleNavVisibility() {
    this.store.dispatch(new ToggleNavVisibilityAction());
  }

}
