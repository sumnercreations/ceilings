import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeyondDesignComponent } from './seeyond-design.component';

describe('SeeyondDesignComponent', () => {
  let component: SeeyondDesignComponent;
  let fixture: ComponentFixture<SeeyondDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeyondDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeyondDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
