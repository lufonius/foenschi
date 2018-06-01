import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AboutMe } from '../models/about-me.model';
import {
  AboutMeActions,
  AboutMeActionTypes
} from '../actions/about-me.actions';

export interface State extends EntityState<AboutMe> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AboutMe> = createEntityAdapter<AboutMe>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: AboutMeActions
): State {
  switch (action.type) {


    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
