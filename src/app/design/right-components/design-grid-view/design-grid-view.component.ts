import { DesignComponent } from './../../design.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-grid-view',
  templateUrl: './design-grid-view.component.html',
  styleUrls: ['../../design.component.scss', './design-grid-view.component.scss']
})
export class DesignGridViewComponent extends DesignComponent implements OnInit {
  ngOnInit() {}
}
