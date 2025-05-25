import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the search component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty username', () => {
    expect(component.username).toBe('');
  });

  it('should call onSearch and dispatch action', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    component.username = 'octocat';
    component.onSearch();
    expect(storeSpy).toHaveBeenCalled();
  });
});
