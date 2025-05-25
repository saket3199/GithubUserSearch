import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './actions';
import { GitHubUser } from '../../../models/github-user.model';

export interface SearchState {
  history: { username: string; user?: GitHubUser; success: boolean; timestamp: number }[];
  currentUser?: GitHubUser;
  loading: boolean;
  error?: string;
}

const initialState: SearchState = {
  history: [],
  loading: false
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.searchUser, (state) => ({
    ...state, loading: true, error: undefined
  })),
  on(SearchActions.searchUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    currentUser: user,
    history: [
      { username: user.login, user, success: true, timestamp: Date.now() },
      ...state.history.filter(h => h.username !== user.login)
    ]
  })),
  on(SearchActions.searchUserFailure, (state, { error, username }) => ({
    ...state,
    loading: false,
    error,
    history: [
      { username, success: false, timestamp: Date.now() },
      ...state.history.filter(h => h.username !== username)
    ]
  })),
  on(SearchActions.clearHistoryEntry, (state, { username }) => ({
    ...state,
    history: state.history.filter(h => h.username !== username)
  }))
);
