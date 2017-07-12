import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  constructor(
    private debug: DebugService
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
  }

}
