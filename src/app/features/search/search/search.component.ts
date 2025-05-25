import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GitHubUser } from 'src/app/models/github-user.model';
import { selectLoading, selectCurrentUser, selectError } from '../store/selectors';
import * as SearchActions from '../store/actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  username = "";
  loading$: Observable<boolean> = this.store.select(selectLoading);
  user$: Observable<GitHubUser | undefined> = this.store.select(selectCurrentUser);
  error$: Observable<string | undefined> = this.store.select(selectError);

  constructor(private store: Store) {}

  onSearch() {
    this.store.dispatch(SearchActions.searchUser({ username: this.username }));
  }

}
