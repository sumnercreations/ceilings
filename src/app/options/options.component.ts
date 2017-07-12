import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(
    private debug: DebugService
  ) { }

  ngOnInit() {
    this.debug.log('options-component', 'init');
  }

}
