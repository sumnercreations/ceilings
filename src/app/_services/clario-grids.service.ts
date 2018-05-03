import { DebugService } from './debug.service';
import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class ClarioGridsService {
  gridSizes: any;
  // tileSizeOptions = [];
  selectedGrid: any = undefined;
  selectedTileSize: any = undefined;
  onTileSizeChange = new EventEmitter();
  tileSizeOptions = [];

  constructor(
    public materials: MaterialsService,
    public feature: Feature,
    public debug: DebugService
  ) {
    this.gridSizes = Object.keys(this.materials.clario_grids);
  }

  gridSizeSelected(selection) {
    this.tileSizeOptions = []; // clear the array when a new selection is made
    this.selectedGrid = selection;
    this.tileSizeSelected(undefined);
    const gridOptionsArr = Object.keys(this.materials.clario_grids[selection]);
    gridOptionsArr.map(key => {
      this.tileSizeOptions.push(this.materials.clario_grids[selection][key]);
    });
    if (this.feature.is_quantity_order) {
      this.setTileSizeOptions(gridOptionsArr);
    }
  }

  setTileSizeOptions(gridOptionsArr) {
    const selectedGrid = this.materials.clario_grids[this.selectedGrid]
    const sizeOptionsArr = [];
    const gridTypes = []; // ['imperial', 'metric', 'german']
    gridOptionsArr.map(option => {
      if (gridTypes.indexOf(selectedGrid[option].grid_type) === -1) {
        gridTypes.push(selectedGrid[option].grid_type);
      }
    });
    const tileSizeOptions = [];
    gridTypes.map(type => {
      let selectName = '';
      gridOptionsArr.map(size => {
        const optionObj = selectedGrid[size];
        if (optionObj.grid_type === type) {
          if (selectName.length < 1) {
            selectName = optionObj.name;
          } else {
            tileSizeOptions.push({
              'type': type,
              'name': `${selectName} and ${optionObj.name}`,
              'units': optionObj.units,
              '24': selectName,
              '48': optionObj.name
            });
            selectName = '';
          }
        }
      })
    });
    this.tileSizeOptions = tileSizeOptions;
  }

  tileSizeSelected(grid) {
    this.debug.log('options-component', `grid selected: ${grid}`);
    this.onTileSizeChange.emit();
    if (grid === undefined) { this.selectedTileSize = grid; return; }
    this.selectedTileSize = this.tileSizeOptions.filter(size => size.name === grid)[0];
    this.feature.units = this.selectedTileSize.units;
    console.log('selectedTileSize:', this.selectedTileSize);
  }

}
