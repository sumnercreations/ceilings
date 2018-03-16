import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeyondDetailsComponent } from './seeyond-details.component';

describe('SeeyondDetailsComponent', () => {
  let component: SeeyondDetailsComponent;
  let fixture: ComponentFixture<SeeyondDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeyondDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeyondDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
