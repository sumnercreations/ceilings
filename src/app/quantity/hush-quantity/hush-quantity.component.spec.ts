import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HushQuantityComponent } from './hush-quantity.component';

describe('HushQuantityComponent', () => {
  let component: HushQuantityComponent;
  let fixture: ComponentFixture<HushQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HushQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HushQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
