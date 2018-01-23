import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeloOptionsComponent } from './velo-options.component';

describe('VeloOptionsComponent', () => {
  let component: VeloOptionsComponent;
  let fixture: ComponentFixture<VeloOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeloOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeloOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
