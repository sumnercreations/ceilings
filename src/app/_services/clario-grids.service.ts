import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClarioGridsService {
  gridTypes: any;
  gridTypeOptions = this.materials.clario_grids;
  selectedGrid: any;

  constructor(
    public materials: MaterialsService,
    public feature: Feature
  ) {
    this.gridTypes = Object.keys(this.materials.clario_grids);
    console.log('gridTypes:', this.gridTypes)
  }

  updateGridTypes() {
    this.gridTypes = Object.keys(this.materials.clario_grids).map(key => this.materials.clario_grids[key]);
    // this.gridTypes = gridTypesArr
  }

  updateGridDimension(selection) {
    console.log('selection:', selection);
    this.selectedGrid = this.setGridData(selection);
    // this.feature.units = this.selectedGrid.units;
  }

  setGridData(selection) {
    const gridOptionsArr = Object.keys(this.materials.clario_grids[selection]).map(key => this.materials.clario_grids[key]);
    this.gridTypeOptions = gridOptionsArr.filter(key => key.name === selection)[0];
  }

}
