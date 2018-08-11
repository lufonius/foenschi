import {Action, INIT} from "@ngrx/store";

export const localStorageMetaReducer = reducer => {
  return (oldState, action: Action) => {
    return reducer(oldState, action);
  }
    /*if(action.type === INIT) {
      //get localstorage
      const cachedStateJSON = localStorage.getItem('store');
      const cachedState = JSON.parse(cachedStateJSON);

      if(cachedState) {
        cachedState.router = undefined;
        return cachedState;
      }
    }

    let newState = reducer(oldState, action);
    let newStateJSON = JSON.stringify(newState);

    console.log('newState', newState);
    localStorage.setItem('store', newStateJSON);

    return newState;
  }*/
};
