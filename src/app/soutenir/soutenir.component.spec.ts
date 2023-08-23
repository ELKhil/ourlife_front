import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenirComponent } from './soutenir.component';

describe('SoutenirComponent', () => {
  let component: SoutenirComponent;
  let fixture: ComponentFixture<SoutenirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoutenirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoutenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
