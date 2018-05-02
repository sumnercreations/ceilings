import { DebugService } from './debug.service';
import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class ClarioGridsService {
  gridSizes: any;
  tileSizeOptions = [];
  selectedGrid: any = undefined;
  selectedTileSize: any = undefined;
  onTileSizeChange = new EventEmitter();

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
    console.log('gridOptionsArr:', gridOptionsArr);
    gridOptionsArr.map(key => {
      this.tileSizeOptions.push(this.materials.clario_grids[selection][key]);
    });
    this.setTileSizeOptions(gridOptionsArr);
  }

  setTileSizeOptions(gridOptions) {
    const selectedGrid = this.materials.clario_grids[this.selectedGrid]
    const sizeOptionsArr = [];
    const gridTypes = []; // ['imperial', 'metric', 'german']
    gridOptions.map(option => {
      if (gridTypes.indexOf(selectedGrid[option].grid_type) === -1) {
        gridTypes.push(selectedGrid[option].grid_type);
      }
    });
    console.log('gridTypes:', gridTypes);
    gridTypes.map(type => {
      const tempArr = [];
      const sizeOption = gridOptions.map(obj => {
        console.log(type, obj);
        // const tempObj: any = {};
        // if (selectedGrid[obj].grid_type === type) {
        //   tempObj.gridType = type;

        // }
      })
      console.log('sizeOption:', sizeOption);
    })

    // const tempSizeArr = [];
    // const namesArr = [];
    // gridOptionsArr.map(key => {
    //   const sizeOptionData = this.materials.clario_grids[selection][key];
    //   let sizeOption: TileSizeOption;
    //   sizeOption.grid_type = sizeOptionData.grid_type;
    //   sizeOption.name = sizeOptionData.name;
    //   if (namesArr.indexOf(sizeOption.name) < 0) { namesArr.push(sizeOption.name); }
    //   tempSizeArr.push(sizeOption);
    // });
    // const sizeOptions = tempSizeArr.map(option => {
    //   console.log(option);
    // })
  }

  tileSizeSelected(grid) {
    this.debug.log('options-component', `grid selected: ${grid}`);
    this.onTileSizeChange.emit();
    if (grid === undefined) { this.selectedTileSize = grid; return; }
    this.selectedTileSize = this.tileSizeOptions.filter(size => size.name === grid)[0];
    this.feature.units = this.selectedTileSize.units;
  }

}

export interface TileSizeOption {
  grid_type: string;
  name: string;
}
