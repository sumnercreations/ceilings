import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetriaOptionsComponent } from './tetria-options.component';

describe('TetriaOptionsComponent', () => {
  let component: TetriaOptionsComponent;
  let fixture: ComponentFixture<TetriaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetriaOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetriaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
