import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDeveloperComponent } from './profil-developer.component';

describe('ProfilDeveloperComponent', () => {
  let component: ProfilDeveloperComponent;
  let fixture: ComponentFixture<ProfilDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
