import { Injectable, EventEmitter } from '@angular/core';
import { DebugService } from './_services/debug.service';

@Injectable()
export class Feature {
  onBuildGrid = new EventEmitter();
  onApplyAll = new EventEmitter();
  onView3d = new EventEmitter();
  onLoadDesigns = new EventEmitter();

  private static _instance: Feature = new Feature();
  private debug: DebugService;

  // attributes saved in DB
  public id: number;
  public uid: number;
  public feature_type: string = "tetria";
  public design_name: string;
  public project_name: string;
  public specifier: string;
  public width: number = 0;
  public length: number = 0;
  public units: string = "inches";
  public material: string = "milky-white";
  public tile_size: number = 24;
  public tiles: number = 0;
  public estimated_amount: number = 0.00;
  public services_amount: number = 0.00;
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean

  // attributes for the tool
  public tile_type: string = 'tile';
  public selectedTile: string = "01";
  public selectedTool: string;
  public showGuide: boolean = true;

  public tilesArray = [
    '01',
    '02',
    '03',
    '00'
  ];

  public materialsArray = [
    'milky-white',
    'heather-gray',
    'charcoal',
    'heather-charcoal',
    'heather-black',
    'black',
    'taupe',
    'heather-taupe',
    'putty',
    'latte',
    'heather-dark-brown',
    'dark-brown',
    'red',
    'crimson',
    'bordeaux',
    'raspberry-jam',
    'royal-purple',
    'midnight-blue',
    'peacock',
    'liberty-blue',
    'deep-turquoise',
    'platinum',
    'sky-blue',
    'teal',
    'hunter-green',
    'avocado',
    'clover-green',
    'goldenrod',
    'camel',
    'orange'
  ];

  public toolsArray = [
    'rotate',
    'remove',
    'light',
    'vent',
    'sprinkler'
  ];

  public gridData: any;

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    Feature._instance = this;
  }

  setDesign(design: any) {
    this.id = design.id;
    this.uid = design.uid;
    this.feature_type = design.feature_type;
    this.design_name = design.design_name;
    this.project_name = design.project_name;
    this.specifier = design.specifier;
    this.width = design.width;
    this.length = design.length;
    this.units = design.units;
    this.material = design.material;
    this.tile_size = design.tile_size;
    this.tiles = design.tiles;
    this.estimated_amount = design.estimated_amount;
    this.services_amount = design.services_amount;
    this.gridData = JSON.parse(design.grid_data);
    this.quoted = design.quoted;
    this.archived = design.archived;

    this.buildGrid();
  }

  updateEstimatedAmount() {
    return this.estimated_amount;
  }

  updateSelectedTile(tile: string) {
    this.selectedTile = tile;

    // if a tool is selected then remove it
    if(this.selectedTool != '') {
      this.selectedTool = '';
    }
  }

  updateSelectedMaterial(material: string) {
    this.material = material;

    // if a tool is selected then remove it
    if(this.selectedTool != '') {
      this.selectedTool = '';
    }
  }

  updateSelectedTool(tool: string) {
    var oldTool = this.selectedTool;
    var newTool = tool;
    // if the tool they clicked on is already selected,
    // deselect it so they have a way to add tiles again.
    if (this.selectedTool == tool) {
      this.selectedTool = '';
    }else{
      this.selectedTool = tool;
    }
  }

  buildGrid() {
    // emit an event to build a new grid
    this.onBuildGrid.emit();
  }

  clearAll() {
    this.gridData = undefined;
    this.buildGrid();
  }

  applyAll() {
    this.onApplyAll.emit();
  }

  toggleGuide() {
    this.showGuide = !this.showGuide;
  }

  view3d() {
    this.onView3d.emit();
  }

  loadDesigns() {
    this.onLoadDesigns.emit();
  }

  public getRows() {
    var rows: number;
    if(this.units == 'inches') {
      rows = Math.ceil(this.length / 12 / 2);
    }else{
      rows = Math.ceil(this.convertCMtoIN(this.length) / 12 / 2);
    }
    return rows;
  }

  public getColumns() {
    var columns: number;
    if(this.units == 'inches') {
      columns = Math.ceil(this.width / 12 / 2);
    }else{
      columns = Math.ceil(this.convertCMtoIN(this.width) / 12 / 2);
    }
    return columns;
  }

  public getFeatureTypeInteger() {
    var type: number;
    switch (this.feature_type) {
      case "tetria":
        type = 100;
        break;

      case "clario":
        type = 200;
        break;

      case "velo":
        type = 300;
        break;

      // default to tetria
      default:
        type = 100;
        break;
    }

    return type;
  }

  public getTileType(grammar: string = 'singular') {
    var type: string = '';
    if(grammar == 'plural') {
      type = this.feature_type == 'clario' ? 'baffles' : 'tiles';
    }else{
      type = this.feature_type == 'clario' ? 'baffle' : 'tile';
    }
    return type;
  }

  public getPackageQty() {
    var qty: number = 0;
    switch (this.feature_type) {
      case "tetria":
        qty = 4;
        break;

      case "clario":
        if(this.tile_size == 24) {
          qty =  4;
        }else{
          qty =  2;
        }
        break;

      case "velo":
        qty = 8;
        break;

      default:
        qty = 4;
        break;
    }
    return qty;
  }

  public getTilesUsed() {
    if(this.gridData) {
      var totalTiles = 0;
      for (var i = this.gridData.length - 1; i >= 0; i--) {
        for (var j = this.gridData[i].length - 1; j >= 0; j--) {
          if(this.gridData[i][j].tile) {
            totalTiles++;
          }
        }
      }
      return totalTiles;
    }else{
      return 0;
    }
  }

  public getTilesPurchased() {
    if(this.gridData) {
      var pkgQty = this.getPackageQty();
      var tiles = [];
      var purchasedTiles = 0;

      // Determine the number of unique tiles (color and tile)
      for (var i = this.gridData.length - 1; i >= 0; i--) {
        for (var j = this.gridData[i].length - 1; j >= 0; j--) {
          if(this.gridData[i][j].tile) {
            tiles[this.gridData[i][j]['material'] + '|' + this.gridData[i][j]['tile']] = (tiles[this.gridData[i][j]['material'] + '|' + this.gridData[i][j]['tile']] || 0) + 1;
          }
        }
      }

      // Round count of unique tiles to nearest factor of pkgQty
      // multiply that by the pkgQty and add to the purchasedTiles total.
      // console.log(tiles);
      for(var tile in tiles) {
        var tileCount = tiles[tile];
        // console.log(tileCount);
        // console.log(tileCount / pkgQty);
        purchasedTiles += pkgQty * Math.ceil(tileCount / pkgQty);
      }
      this.tiles = purchasedTiles;
      return purchasedTiles;
    }else{
      return 0;
    }
  }

  public getUserInputs() {
    return {
      "UserInputs": {
        "Type": this.getFeatureTypeInteger(),
        "NumX": this.getRows(),
        "NumY": this.getColumns(),
        "Tiles": this.gridData
      }
    }
  }

  public convertCMtoIN(cm: number) {
    // 1 cm = 0.393701 in
    var conversion: number = 0.393701;
    var inches = cm * conversion;
    return Math.ceil(inches);
  }
}
