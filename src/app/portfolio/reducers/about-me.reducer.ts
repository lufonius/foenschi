import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AboutMe } from '../models/about-me.model';
import { AboutMeActions, AboutMeActionTypes } from '../actions/about-me.actions';

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
    case AboutMeActionTypes.AddAboutMe: {
      return adapter.addOne(action.payload.aboutMe, state);
    }

    case AboutMeActionTypes.UpsertAboutMe: {
      return adapter.upsertOne(action.payload.aboutMe, state);
    }

    case AboutMeActionTypes.AddAboutMes: {
      return adapter.addMany(action.payload.aboutMes, state);
    }

    case AboutMeActionTypes.UpsertAboutMes: {
      return adapter.upsertMany(action.payload.aboutMes, state);
    }

    case AboutMeActionTypes.UpdateAboutMe: {
      return adapter.updateOne(action.payload.aboutMe, state);
    }

    case AboutMeActionTypes.UpdateAboutMes: {
      return adapter.updateMany(action.payload.aboutMes, state);
    }

    case AboutMeActionTypes.DeleteAboutMe: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AboutMeActionTypes.DeleteAboutMes: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AboutMeActionTypes.LoadAboutMes: {
      return adapter.addAll(action.payload.aboutMes, state);
    }

    case AboutMeActionTypes.ClearAboutMes: {
      return adapter.removeAll(state);
    }

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
