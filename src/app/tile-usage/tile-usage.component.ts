import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';

@Component({
  selector: 'app-tile-usage',
  templateUrl: './tile-usage.component.html',
  styleUrls: ['./tile-usage.component.css']
})
export class TileUsageComponent implements OnInit {
  public purchasedTiles: any;
  public position = 'above';

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.purchasedTiles = this.feature.getTilesPurchasedArray();
  }

  public tooltip(tile) {
    return tile.material + ' - ' + tile.tile;
  }

}
