import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';

@Component({
  selector: 'app-velo-tile-usage',
  templateUrl: './velo-tile-usage.component.html',
  styleUrls: ['./velo-tile-usage.component.css']
})
export class VeloTileUsageComponent implements OnInit {
  public feltTiles: any;
  public variaTiles: any;

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.feltTiles = this.feature.getTilesPurchasedArray('felt');
    this.variaTiles = this.feature.getTilesPurchasedArray('varia');
  }

}
