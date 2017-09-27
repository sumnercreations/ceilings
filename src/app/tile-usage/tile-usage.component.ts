import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';

@Component({
  selector: 'app-tile-usage',
  templateUrl: './tile-usage.component.html',
  styleUrls: ['./tile-usage.component.css']
})
export class TileUsageComponent implements OnInit {
  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
  }

}
