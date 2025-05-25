import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectHistory = createSelector(
  selectSearchState,
  (state) => state.history
);

export const selectCurrentUser = createSelector(
  selectSearchState,
  (state) => state.currentUser
);

export const selectLoading = createSelector(
  selectSearchState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectSearchState,
  (state) => state.error
);
