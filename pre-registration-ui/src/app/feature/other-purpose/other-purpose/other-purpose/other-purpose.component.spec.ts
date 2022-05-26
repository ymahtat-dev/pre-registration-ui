import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPurposeComponent } from './other-purpose.component';

describe('OtherPurposeComponent', () => {
  let component: OtherPurposeComponent;
  let fixture: ComponentFixture<OtherPurposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPurposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
