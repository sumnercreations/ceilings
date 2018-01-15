import { KeysPipe } from './../_pipes/keys.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignComponent } from './design.component';
import { CapitalizePipe } from 'app/_pipes/capitalize.pipe';

describe('DesignComponent', () => {
  let component: DesignComponent;
  let fixture: ComponentFixture<DesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DesignComponent,
        CapitalizePipe,
        KeysPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // RESTORE
  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
