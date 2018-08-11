import {State} from "../reducers";
import {environment} from "../../../environments/environment";

export type CachedState = {
  store: State,
  expiry: number
}

export const CachedStateHelper = {
    getCachedState: (): CachedState => {
      const cachedStateJSON = localStorage.getItem('store');
      const cachedState = JSON.parse(cachedStateJSON);

      return cachedState;
    },

    setCachedStore: (state: State) => {
      const expirationDuration = environment.expirationDuration;

      //convert h to ms
      const expirationDurationMiliseconds = expirationDuration * 3600 * 1000;

      const cachedState: CachedState = {
        store: state,
        expiry: (Date.now() + expirationDurationMiliseconds)
      };

      let cachedStateJSON = JSON.stringify(cachedState);
      localStorage.setItem('store', cachedStateJSON);
    },

    hasSelectedLanguage: () => {
      const cachedState = this.getCachedState();
      const currentLanguage = cachedState.language.currentLanguage;
      const isValidLanguage =
        cachedState
          .language
          .availableLanguages
          .find((lang: string) => lang === currentLanguage);

      return cachedState && isValidLanguage && currentLanguage;
    },

    isCachedStateExpired: () => {
      const cachedStore = this.getCachedState();

      return Date.now() > cachedStore.expiry;
    }
}
