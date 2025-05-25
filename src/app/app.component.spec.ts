import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [AppComponent, NavbarComponent]
  }).compileComponents();
});
