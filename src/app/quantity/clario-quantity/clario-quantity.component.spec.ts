import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarioQuantityComponent } from './clario-quantity.component';

describe('ClarioQuantityComponent', () => {
  let component: ClarioQuantityComponent;
  let fixture: ComponentFixture<ClarioQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarioQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarioQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
