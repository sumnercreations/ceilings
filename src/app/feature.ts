import { Injectable, EventEmitter } from '@angular/core';
import { DebugService } from './_services/debug.service';

@Injectable()
export class Feature {
  onFeatureUpdated = new EventEmitter();
  private static _instance: Feature = new Feature();
  private debug: any;

  // attributes saved in DB
  public id: number;
  public uid: number;
  public design_name: string;
  public project_name: string;
  public specifier: string;
  public width: number = 0;
  public length: number = 0;
  public feature_type: string = "tiles";
  public units: string = "inches";
  public tile_size: number = 24;
  public tiles: number = 0;
  public estimated_amount: number = 0.00;
  public xml: any = {};
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean

  // attributes for the tool
  public selectedTile: string = "tile_01";
  public selectedMaterial: string = "milky-white";
  public selectedTool: string;

  public tilesArray = [
    'tile_01',
    'tile_02',
    'tile_03',
    'tile_04'
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

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    Feature._instance = this;
  }

  updateEstimatedAmount() {
    this.debug.log('feature', 'updating estimated amount');
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
    this.selectedMaterial = material;

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
}
