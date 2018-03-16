import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDesignComponent } from './load-design.component';

describe('LoadDesignComponent', () => {
  let component: LoadDesignComponent;
  let fixture: ComponentFixture<LoadDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // RESTORE
  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
