import { provideMockStore } from '@ngrx/store/testing';
import { HistoryComponent } from './history.component';
import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [HistoryComponent],
    providers: [provideMockStore()]
  }).compileComponents();
});
