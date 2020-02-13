import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfilComponent } from './search-profil.component';

describe('SearchProfilComponent', () => {
  let component: SearchProfilComponent;
  let fixture: ComponentFixture<SearchProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
