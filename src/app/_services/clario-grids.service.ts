import { DebugService } from './debug.service';
import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClarioGridsService {
  gridTypes: any;
  tileSizeOptions = [];
  selectedGrid: any;
  selectedTileSize: any;

  constructor(
    public materials: MaterialsService,
    public feature: Feature,
    public debug: DebugService
  ) {
    this.gridTypes = Object.keys(this.materials.clario_grids);
  }

  gridTypeSelected(selection) {
    this.tileSizeOptions = [];
    this.selectedGrid = selection;
    this.selectedTileSize = undefined;
    const gridOptionsArr = Object.keys(this.materials.clario_grids[selection]);
    gridOptionsArr.map(key => {
      this.tileSizeOptions.push(this.materials.clario_grids[selection][key]);
    });
  }

  tileSizeSelected(grid) {
    this.debug.log('options-component', `grid selected: ${grid}`);
    this.selectedTileSize = this.tileSizeOptions.filter(size => size.name === grid)[0];
    this.feature.units = this.selectedTileSize.units;
  }

}
