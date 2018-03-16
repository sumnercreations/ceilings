import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeyondOptionsComponent } from './seeyond-options.component';

describe('SeeyondOptionsComponent', () => {
  let component: SeeyondOptionsComponent;
  let fixture: ComponentFixture<SeeyondOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeyondOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeyondOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
