import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './actions';
import { GithubApiService } from '../../../services/github-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class SearchEffects {
  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchUser),
      mergeMap(action =>
        this.githubApi.searchUser(action.username).pipe(
          map(user => SearchActions.searchUserSuccess({ user })),
          catchError(err => of(SearchActions.searchUserFailure({ error: err.message, username: action.username })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private githubApi: GithubApiService) {}
}
