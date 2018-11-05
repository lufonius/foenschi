import {Action, INIT} from "@ngrx/store";
import * as fromRoot from './';

export function localStorageMetaReducer(reducer) {
  return (oldState, action: Action) => {

    if(action.type === INIT) {
      //get localstorage
      const cachedStateJSON = localStorage.getItem('store');
      const cachedState = JSON.parse(cachedStateJSON);

      console.log(cachedState);

      if(cachedState) {
        //cachedState.router = undefined;
        return cachedState;
      }
    }

    //on every change of the state, this is getting executed ... ok?!
    let newState = <fromRoot.State>reducer(oldState, action);
    let newStateOnlyLanguage = { language: newState.language };
    let newStateOnlyLanguageJSON = JSON.stringify(newStateOnlyLanguage);

    localStorage.setItem('store', newStateOnlyLanguageJSON);

    return newState;
  }
};
