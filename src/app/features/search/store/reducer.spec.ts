import { searchReducer, SearchState } from './reducer';
import * as SearchActions from './actions';
import { GitHubUser } from '../../../models/github-user.model';

describe('SearchReducer', () => {
  const initialState: SearchState = {
    history: [],
    loading: false,
  };

  it('should set loading on searchUser', () => {
    const state = searchReducer(initialState, SearchActions.searchUser({ username: 'octocat' }));
    expect(state.loading).toBeTrue();
  });

  it('should add successful search to history', () => {
    const user: GitHubUser = { login: 'octocat', id: 1, avatar_url: '', html_url: '', public_repos: 0, followers: 0, following: 0, created_at: '' };
    const state = searchReducer(initialState, SearchActions.searchUserSuccess({ user }));
    expect(state.history.length).toBe(1);
    expect(state.history[0].username).toBe('octocat');
    expect(state.history[0].success).toBeTrue();
  });

  it('should add failed search to history', () => {
    const state = searchReducer(initialState, SearchActions.searchUserFailure({ error: 'Not found', username: 'ghost' }));
    expect(state.history.length).toBe(1);
    expect(state.history[0].username).toBe('ghost');
    expect(state.history[0].success).toBeFalse();
  });

  it('should clear a history entry', () => {
    const preState: SearchState = {
      history: [{ username: 'octocat', success: true, timestamp: Date.now() }],
      loading: false,
    };
    const state = searchReducer(preState, SearchActions.clearHistoryEntry({ username: 'octocat' }));
    expect(state.history.length).toBe(0);
  });
});
