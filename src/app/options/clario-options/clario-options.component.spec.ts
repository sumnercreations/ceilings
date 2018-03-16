import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarioOptionsComponent } from './clario-options.component';

describe('ClarioOptionsComponent', () => {
  let component: ClarioOptionsComponent;
  let fixture: ComponentFixture<ClarioOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarioOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarioOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
