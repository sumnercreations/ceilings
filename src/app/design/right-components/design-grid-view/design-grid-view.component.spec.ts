import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignGridViewComponent } from './design-grid-view.component';

describe('DesignGridViewComponent', () => {
  let component: DesignGridViewComponent;
  let fixture: ComponentFixture<DesignGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
