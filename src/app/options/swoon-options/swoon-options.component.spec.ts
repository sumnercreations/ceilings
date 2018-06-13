import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwoonOptionsComponent } from './swoon-options.component';

describe('SwoonOptionsComponent', () => {
  let component: SwoonOptionsComponent;
  let fixture: ComponentFixture<SwoonOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwoonOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwoonOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
