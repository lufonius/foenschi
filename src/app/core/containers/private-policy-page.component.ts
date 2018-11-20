import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../portfolio/reducers/index';
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'lf-private-policy-page',
  template: `
    <lf-private-policy></lf-private-policy>
  `
})
export class PrivatePolicyPageComponent  {}
