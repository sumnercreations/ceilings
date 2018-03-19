import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeyondVisualizationComponent } from './seeyond-visualization.component';

describe('SeeyondVisualizationComponent', () => {
  let component: SeeyondVisualizationComponent;
  let fixture: ComponentFixture<SeeyondVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeyondVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeyondVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
