import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileUsageComponent } from './tile-usage.component';

describe('TileUsageComponent', () => {
  let component: TileUsageComponent;
  let fixture: ComponentFixture<TileUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // RESTORE
  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
