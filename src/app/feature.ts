import { Injectable, EventEmitter } from '@angular/core';
import { DebugService } from './_services/debug.service';

@Injectable()
export class Feature {
  onBuildGrid = new EventEmitter();
  onApplyAll = new EventEmitter();
  onToggleGuide = new EventEmitter();
  onView3d = new EventEmitter();
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
  public xml: any = {};
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean

  // attributes for the tool
  public selectedTile: string = "01";
  public selectedTool: string;

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
    this.xml = design.xml;
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
    this.onToggleGuide.emit();
  }

  view3d() {
    this.onView3d.emit();
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

  public getUserInputs() {
    return {
      "UserInputs": {
        "Type": this.getFeatureTypeInteger(),
        "Material": this.material,
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
