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
  public position = 'above';

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.feltTiles = this.feature.getPurchasedVeloTiles('felt');
    this.variaTiles = this.feature.getPurchasedVeloTiles('varia');
  }

  public variaTooltip(tile) {
    if (tile.diffusion) {
      return tile.material + ' + ' + tile.diffusion;
    }else {
      return tile.material;
    }
  }

  public diffusionString(diffusion: string) {
    let humanString: string;
    switch (diffusion) {
      case 'avalanche_d01':
        humanString = 'Avalanche D01';
        break;

      case 'vapor_w05':
        humanString = 'Vapor W05';
        break;

      default:
        humanString = 'None';
        break;
    }
    return humanString;

  }

}
