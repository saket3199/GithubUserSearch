import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHistory } from '../../search/store/selectors';
import * as SearchActions from '../../search/store/actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  history$ = this.store.select(selectHistory);

  constructor(private store: Store) {}

  clearEntry(username: string) {
    this.store.dispatch(SearchActions.clearHistoryEntry({ username }));
  }
}
