import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ProfileComponent],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { paramMap: { get: () => 'octocat' } },
          params: of({ username: 'octocat' })
        }
      }
    ]
  }).compileComponents();
});
