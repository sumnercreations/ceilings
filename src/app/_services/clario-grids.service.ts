import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClarioGridsService {
  gridTypes: any;
  gridTypeOptions = [];
  selectedGrid: any;
  selectedTileSize: any;

  constructor(
    public materials: MaterialsService,
    public feature: Feature
  ) {
    this.gridTypes = Object.keys(this.materials.clario_grids);
  }

  setGridTypes(selection) {
    this.gridTypeOptions = [];
    this.selectedGrid = selection;
    this.selectedTileSize = undefined;
    const gridOptionsArr = Object.keys(this.materials.clario_grids[selection]);
    gridOptionsArr.map(key => {
      this.gridTypeOptions.push(this.materials.clario_grids[selection][key]);
    });
  }

  gridSelected(grid) {
    this.selectedTileSize = grid;
  }

}
