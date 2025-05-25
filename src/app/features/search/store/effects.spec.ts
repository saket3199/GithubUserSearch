import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { SearchEffects } from './effects';
import { GithubApiService } from '../../../services/github-api.service';
import * as SearchActions from './actions';
import { hot, cold } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { GitHubUser } from 'src/app/models/github-user.model';

describe('SearchEffects', () => {
  let actions$: Observable<any>;
  let effects: SearchEffects;
  let githubApi: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    const githubApiSpy = jasmine.createSpyObj('GithubApiService', [
      'searchUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SearchEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: GithubApiService, useValue: githubApiSpy },
      ],
    });

    effects = TestBed.inject(SearchEffects);
    githubApi = TestBed.inject(
      GithubApiService
    ) as jasmine.SpyObj<GithubApiService>;
  });

  it('should dispatch searchUserSuccess on success', () => {
    const user: GitHubUser = {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      html_url: 'https://github.com/octocat',
      public_repos: 10,
      followers: 100,
      following: 50,
      created_at: '2011-01-25T18:44:36Z',
    };
    const action = SearchActions.searchUser({ username: 'octocat' });
    const outcome = SearchActions.searchUserSuccess({ user });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-b|', { b: user });
    githubApi.searchUser.and.returnValue(response$);

    const expected$ = cold('--c', { c: outcome });
    expect(effects.searchUser$).toBeObservable(expected$);
  });

  it('should dispatch searchUserFailure on error', () => {
    const action = SearchActions.searchUser({ username: 'ghost' });
    const error = 'Not found';
    const outcome = SearchActions.searchUserFailure({
      error,
      username: 'ghost',
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-#|', {}, { message: error });
    githubApi.searchUser.and.returnValue(response$);

    const expected$ = cold('--c', { c: outcome });
    expect(effects.searchUser$).toBeObservable(expected$);
  });
});
