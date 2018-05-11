import { DebugService } from './debug.service';
import { Feature } from 'app/feature';
import { MaterialsService } from 'app/_services/materials.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class ClarioGridsService {
  gridSizes: any;
  selectedTileSize: any = undefined;
  onTileSizeChange = new EventEmitter();
  tileSizeOptions = [];
  tile_size_type = 'standard';

  constructor(public materials: MaterialsService, public feature: Feature, public debug: DebugService) {
    this.gridSizes = Object.keys(this.materials.clario_grids);
  }

  gridSizeSelected(selection) {
    if (!!selection) {
      console.log('gridSizeSelected:', selection);
      this.tileSizeOptions = []; // clear the array when a new selection is made
      this.feature.grid_type = selection;
      this.tileSizeSelected(undefined);
      const gridOptionsArr = Object.keys(this.materials.clario_grids[selection]);
      gridOptionsArr.map(key => {
        this.tileSizeOptions.push(this.materials.clario_grids[selection][key]);
      });
      if (this.feature.is_quantity_order) {
        this.setTileSizeOptions(gridOptionsArr);
      }
    }
  }

  setTileSizeOptions(gridOptionsArr) {
    const selectedGrid = this.materials.clario_grids[this.feature.grid_type];
    const sizeOptionsArr = [];
    const gridTypes = []; // ['standard', 'metric', 'german']
    gridOptionsArr.map(option => {
      if (gridTypes.indexOf(selectedGrid[option].tile_size_type) === -1) {
        gridTypes.push(selectedGrid[option].tile_size_type);
      }
    });
    const tileSizeOptions = [];
    gridTypes.map(type => {
      let selectName = '';
      gridOptionsArr.map(size => {
        const optionObj = selectedGrid[size];
        if (optionObj.tile_size_type === type) {
          if (selectName.length < 1) {
            selectName = optionObj.name;
          } else {
            tileSizeOptions.push({
              tile_size_type: type,
              name: `${selectName} and ${optionObj.name}`,
              units: optionObj.units,
              '24': selectName,
              '48': optionObj.name
            });
            selectName = '';
          }
        }
      });
    });
    this.tileSizeOptions = tileSizeOptions;
  }

  tileSizeSelected(grid) {
    this.debug.log('clario-grid', `grid selected: ${grid}`);
    this.onTileSizeChange.emit();
    if (grid === undefined) {
      this.selectedTileSize = grid;
      return;
    }
    this.selectedTileSize = this.tileSizeOptions.filter(size => size.name === grid)[0];
    this.tile_size_type = this.selectedTileSize.tile_size_type;
    this.feature.units = this.selectedTileSize.units;
    this.debug.log('clario-grid', this.selectedTileSize);
  }

  setGridTileSizeOptions() {
    const clarioTilesArr = Object.keys(this.feature.tilesArray.clario).map(key => this.feature.tilesArray.clario[key]);
    const selectedGridTileOptions = [];
    clarioTilesArr.map(tileOption => {
      if (tileOption.tile_size_type === this.tile_size_type) {
        selectedGridTileOptions.push(tileOption);
      }
    });
    this.debug.log('clario-grid', selectedGridTileOptions);
  }

  loadSelectedTileSize(tile_size, is_quantity_order) {
    const tileSizes = Object.keys(this.tileSizeOptions).map(key => this.tileSizeOptions[key].name);
    tileSizes.map(size => {
      if (size.includes(tile_size)) {
        this.tileSizeSelected(size);
        return;
      }
    });
  }
}
