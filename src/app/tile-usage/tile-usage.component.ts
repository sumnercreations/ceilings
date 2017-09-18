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
    var tiles = this.feature.getTilesPurchasedArray();
    for(var tile in tiles) {
      var tilesPurchased = tiles[tile];
      var tileInfo = tile.split('|');
      for(var info in tileInfo) {
        this.debug.log('tile-usage-component', tileInfo);
        this.debug.log('tile-usage-component', tileInfo[info]);
      }
    }
    this.debug.log('tile-usage-component', this.feature.getTilesPurchasedArray());
  }

}
