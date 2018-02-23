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
  public totalUsed: number;
  public totalReceiving: number;
  public totalUnused: number;

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.purchasedTiles = this.feature.getTilesPurchasedObj();
    this.getTotals();
  }

  getTotals() {
    let totalReceiving = 0;
    let totalUsed = 0;
    let totalUnused = 0;
    let incrementReceiving;
    let incrementUsed;
    let incrementUnused;
    const purchased = this.purchasedTiles;
    for (const tileType in purchased) {
      if (purchased.hasOwnProperty(tileType)) {
        incrementReceiving = purchased[tileType].purchased;
        totalReceiving += incrementReceiving;
        incrementUsed = purchased[tileType].used;
        totalUsed += incrementUsed;
        incrementUnused = (purchased[tileType].purchased - purchased[tileType].used);
        totalUnused += incrementUnused;
      }
    }
    this.totalUsed = totalUsed;
    this.totalReceiving = totalReceiving;
    this.totalUnused = totalUnused;
  }

  public tooltip(tile) {
    return `${tile.material}-${tile.tile}`;
  }

}
