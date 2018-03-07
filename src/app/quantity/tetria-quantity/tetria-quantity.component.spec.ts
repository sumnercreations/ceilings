import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetriaQuantityComponent } from './tetria-quantity.component';

describe('TetriaQuantityComponent', () => {
  let component: TetriaQuantityComponent;
  let fixture: ComponentFixture<TetriaQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetriaQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetriaQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
