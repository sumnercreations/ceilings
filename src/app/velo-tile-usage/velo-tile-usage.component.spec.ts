import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeloTileUsageComponent } from './velo-tile-usage.component';

describe('VeloTileUsageComponent', () => {
  let component: VeloTileUsageComponent;
  let fixture: ComponentFixture<VeloTileUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeloTileUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeloTileUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
