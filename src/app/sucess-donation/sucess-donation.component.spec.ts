import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessDonationComponent } from './sucess-donation.component';

describe('SucessDonationComponent', () => {
  let component: SucessDonationComponent;
  let fixture: ComponentFixture<SucessDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
