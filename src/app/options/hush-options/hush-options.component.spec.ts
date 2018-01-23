import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HushOptionsComponent } from './hush-options.component';

describe('HushOptionsComponent', () => {
  let component: HushOptionsComponent;
  let fixture: ComponentFixture<HushOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HushOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HushOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
