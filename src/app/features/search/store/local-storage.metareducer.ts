import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const newState = reducer(state, action);

    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('searchState');
      if (storageValue) {
        return JSON.parse(storageValue);
      }
    }

    localStorage.setItem('searchState', JSON.stringify(newState));
    return newState;
  };
}
