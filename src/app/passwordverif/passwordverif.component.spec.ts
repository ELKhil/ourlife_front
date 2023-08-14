import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordverifComponent } from './passwordverif.component';

describe('PasswordverifComponent', () => {
  let component: PasswordverifComponent;
  let fixture: ComponentFixture<PasswordverifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordverifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordverifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
