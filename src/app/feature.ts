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
  public width: number;
  public length: number;
  public units: string = "inches";
  public material: string;
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

  public tilesArray = {
    tetria: {
      0: {
        image: '/assets/images/tiles/01.png',
        tile: '01'
      },
      1: {
        image: '/assets/images/tiles/02.png',
        tile: '02'
      },
      2: {
        image: '/assets/images/tiles/03.png',
        tile: '03'
      },
      3: {
        image: '/assets/images/tiles/00.png',
        tile: '00'
      }
    },
    clario: {
      0: {
        image: '/assets/images/baffles/baffle_24_x_24.png',
        tile: '24'
      },
      1: {
        image: '/assets/images/baffles/baffle_24_x_48.png',
        tile: '48'
      },
      2: {
        image: '/assets/images/tiles/00.png',
        tile: '00'
      }
    },
    velo: {
      0: {
        image: '/assets/images/velo/concave.png',
        tile: 'concave'
      },
      1: {
        image: '/assets/images/velo/convex.png',
        tile: 'convex'
      }
    }
  };

  public newMaterialsArray = {
    tetria: {
      0: {
        material: 'milky-white',
        image: '/assets/images/materials/felt/merino/milky-white.png'
      },
      1: {
        material: 'heather-gray',
        image: '/assets/images/materials/felt/merino/heather-gray.png'
      },
      2: {
        material: 'charcoal',
        image: '/assets/images/materials/felt/merino/charcoal.png'
      },
      3: {
        material: 'heather-charcoal',
        image: '/assets/images/materials/felt/merino/heather-charcoal.png'
      },
      4: {
        material: 'heather-black',
        image: '/assets/images/materials/felt/merino/heather-black.png'
      },
      5: {
        material: 'black',
        image: '/assets/images/materials/felt/merino/black.png'
      },
      6: {
        material: 'taupe',
        image: '/assets/images/materials/felt/merino/taupe.png'
      },
      7: {
        material: 'heather-taupe',
        image: '/assets/images/materials/felt/merino/heather-taupe.png'
      },
      8: {
        material: 'putty',
        image: '/assets/images/materials/felt/merino/putty.png'
      },
      9: {
        material: 'latte',
        image: '/assets/images/materials/felt/merino/latte.png'
      },
      10: {
        material: 'heather-dark-brown',
        image: '/assets/images/materials/felt/merino/heather-dark-brown.png'
      },
      11: {
        material: 'dark-brown',
        image: '/assets/images/materials/felt/merino/dark-brown.png'
      },
      12: {
        material: 'red',
        image: '/assets/images/materials/felt/merino/red.png'
      },
      13: {
        material: 'crimson',
        image: '/assets/images/materials/felt/merino/crimson.png'
      },
      14: {
        material: 'bordeaux',
        image: '/assets/images/materials/felt/merino/bordeaux.png'
      },
      15: {
        material: 'raspberry-jam',
        image: '/assets/images/materials/felt/merino/raspberry-jam.png'
      },
      16: {
        material: 'royal-purple',
        image: '/assets/images/materials/felt/merino/royal-purple.png'
      },
      17: {
        material: 'midnight-blue',
        image: '/assets/images/materials/felt/merino/midnight-blue.png'
      },
      18: {
        material: 'peacock',
        image: '/assets/images/materials/felt/merino/peacock.png'
      },
      19: {
        material: 'liberty-blue',
        image: '/assets/images/materials/felt/merino/liberty-blue.png'
      },
      20: {
        material: 'deep-turquoise',
        image: '/assets/images/materials/felt/merino/deep-turquoise.png'
      },
      21: {
        material: 'platinum',
        image: '/assets/images/materials/felt/merino/platinum.png'
      },
      22: {
        material: 'sky-blue',
        image: '/assets/images/materials/felt/merino/sky-blue.png'
      },
      23: {
        material: 'teal',
        image: '/assets/images/materials/felt/merino/teal.png'
      },
      24: {
        material: 'hunter-green',
        image: '/assets/images/materials/felt/merino/hunter-green.png'
      },
      25: {
        material: 'avocado',
        image: '/assets/images/materials/felt/merino/avocado.png'
      },
      26: {
        material: 'clover-green',
        image: '/assets/images/materials/felt/merino/clover-green.png'
      },
      27: {
        material: 'goldenrod',
        image: '/assets/images/materials/felt/merino/goldenrod.png'
      },
      28: {
        material: 'camel',
        image: '/assets/images/materials/felt/merino/camel.png'
      },
      29: {
        material: 'orange',
        image: '/assets/images/materials/felt/merino/orange.png'
      }
    },
    clario: {
      0: {
        material: 'zinc',
        image: '/assets/images/materials/felt/sola/zinc.jpg'
      },
      1: {
        material: 'nickel',
        image: '/assets/images/materials/felt/sola/nickel.jpg'
      },
      2: {
        material: 'cashmere',
        image: '/assets/images/materials/felt/sola/cashmere.jpg'
      },
      3: {
        material: 'burnt_umber',
        image: '/assets/images/materials/felt/sola/burnt_umber.jpg'
      },
      4: {
        material: 'ore',
        image: '/assets/images/materials/felt/sola/ore.jpg'
      },
      5: {
        material: 'dark_gray',
        image: '/assets/images/materials/felt/sola/dark_gray.jpg'
      },
      6: {
        material: 'cast',
        image: '/assets/images/materials/felt/sola/cast.jpg'
      },
      7: {
        material: 'ebony',
        image: '/assets/images/materials/felt/sola/ebony.jpg'
      }
    },
    velo: {
      felt: {
        0: {
          material: 'milky-white',
          image: '/assets/images/materials/felt/merino/milky-white.png'
        },
        1: {
          material: 'heather-gray',
          image: '/assets/images/materials/felt/merino/heather-gray.png'
        },
        2: {
          material: 'charcoal',
          image: '/assets/images/materials/felt/merino/charcoal.png'
        },
        3: {
          material: 'heather-charcoal',
          image: '/assets/images/materials/felt/merino/heather-charcoal.png'
        },
        4: {
          material: 'heather-black',
          image: '/assets/images/materials/felt/merino/heather-black.png'
        },
        5: {
          material: 'black',
          image: '/assets/images/materials/felt/merino/black.png'
        },
        6: {
          material: 'taupe',
          image: '/assets/images/materials/felt/merino/taupe.png'
        },
        7: {
          material: 'heather-taupe',
          image: '/assets/images/materials/felt/merino/heather-taupe.png'
        },
        8: {
          material: 'putty',
          image: '/assets/images/materials/felt/merino/putty.png'
        },
        9: {
          material: 'latte',
          image: '/assets/images/materials/felt/merino/latte.png'
        },
        10: {
          material: 'heather-dark-brown',
          image: '/assets/images/materials/felt/merino/heather-dark-brown.png'
        },
        11: {
          material: 'dark-brown',
          image: '/assets/images/materials/felt/merino/dark-brown.png'
        },
        12: {
          material: 'red',
          image: '/assets/images/materials/felt/merino/red.png'
        },
        13: {
          material: 'crimson',
          image: '/assets/images/materials/felt/merino/crimson.png'
        },
        14: {
          material: 'bordeaux',
          image: '/assets/images/materials/felt/merino/bordeaux.png'
        },
        15: {
          material: 'raspberry-jam',
          image: '/assets/images/materials/felt/merino/raspberry-jam.png'
        },
        16: {
          material: 'royal-purple',
          image: '/assets/images/materials/felt/merino/royal-purple.png'
        },
        17: {
          material: 'midnight-blue',
          image: '/assets/images/materials/felt/merino/midnight-blue.png'
        },
        18: {
          material: 'peacock',
          image: '/assets/images/materials/felt/merino/peacock.png'
        },
        19: {
          material: 'liberty-blue',
          image: '/assets/images/materials/felt/merino/liberty-blue.png'
        },
        20: {
          material: 'deep-turquoise',
          image: '/assets/images/materials/felt/merino/deep-turquoise.png'
        },
        21: {
          material: 'platinum',
          image: '/assets/images/materials/felt/merino/platinum.png'
        },
        22: {
          material: 'sky-blue',
          image: '/assets/images/materials/felt/merino/sky-blue.png'
        },
        23: {
          material: 'teal',
          image: '/assets/images/materials/felt/merino/teal.png'
        },
        24: {
          material: 'hunter-green',
          image: '/assets/images/materials/felt/merino/hunter-green.png'
        },
        25: {
          material: 'avocado',
          image: '/assets/images/materials/felt/merino/avocado.png'
        },
        26: {
          material: 'clover-green',
          image: '/assets/images/materials/felt/merino/clover-green.png'
        },
        27: {
          material: 'goldenrod',
          image: '/assets/images/materials/felt/merino/goldenrod.png'
        },
        28: {
          material: 'camel',
          image: '/assets/images/materials/felt/merino/camel.png'
        },
        29: {
          material: 'orange',
          image: '/assets/images/materials/felt/merino/orange.png'
        }
      },
      varia: {
        0: {
          material: 'glazed_g15',
          image: '/assets/images/materials/varia/glazed_g15.png'
        }
      }
    }
  }

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
    console.log("updating estimated_amount");
    var tilesArray = this.getTilesPurchasedArray();

    // TETRIA
    if(this.feature_type == 'tetria') {
      var flatTilePrice = 73.00;
      var tetriaTilePrice = 135.73;
      var tileWeight = 1.55;
      var flatTileCount = 0;
      var tetriaTileCount = 0;
      var tetriaTiles = ["01","02","03"];

      for (var tile in tilesArray) {
        // console.log(tiles[tile]);
        var currentTile = tilesArray[tile];
        // console.log(currentTile.purchased);
        if(tetriaTiles.indexOf(currentTile.tile) != -1) {
          // console.log(currentTile);
          // add the purchased amount to the tetria tile count
          tetriaTileCount += currentTile.purchased;
        }else if(currentTile.tile == "00"){
          // add the purchased amount to the flat tile count
          console.log(currentTile);
          flatTileCount += currentTile.purchased;
        }
      }
      console.log("tetria tiles: " + tetriaTileCount);
      console.log("flat tiles: " + flatTileCount);
      this.services_amount = (tetriaTileCount * tetriaTilePrice) + (flatTileCount * flatTilePrice);
      this.estimated_amount = this.services_amount;
    } // END TETRIA

    // CLARIO
    if(this.feature_type == 'clario') {
      console.log('this is a clario design');
      console.log(tilesArray);
      var products_amount: number = 0.00;
      var clario24TileCount = 0;
      var clario48TileCount = 0;
      for (var tile in tilesArray) {
        var currentTile = tilesArray[tile];
        console.log(currentTile);
        if(currentTile.tile == "24") {
          // 24x24 prices
          clario24TileCount += currentTile.purchased;
          // what part_id is the material?
          // how many sheets do we need? sheetsNeeded = (currentTile.purchased / 4);
          // sheetCost = sheetsNeeded * prices[part_id];
          // products_amount += sheetCost;
        }else if(currentTile.tile == "48") {
          // 24x48 prices
          clario48TileCount += currentTile.purchased;
        }
      }

      // SERVICES AMOUNT
      var service24Cost = 44.79;
      var service48Cost = 44.79;
      var service24TileCost = clario24TileCount * service24Cost;
      var service48TileCost = clario48TileCount * service48Cost;
      this.services_amount = service24TileCost + service48TileCost;
      // END SERVICES AMOUNT

      this.estimated_amount = this.services_amount + products_amount;
    } // END CLARIO

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
    this.estimated_amount = 0.00;
    this.buildGrid();
  }

  applyAll() {
    this.updateEstimatedAmount();
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

  public getPackageQty(tile: string) {
    var qty: number = 0;
    switch (tile) {
      case "00":
      case "01":
      case "02":
      case "03":
      case "24":
        qty = 4;
        break;

      case "48":
        qty = 2;
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

  public getTilesPurchasedArray() {
    // Determine the number of unique tiles (color and tile)
    var pkgQty: number;
    var tileType = this.getTileType('plural');
    var tiles = [];
    if(this.gridData) {
      for (var i = this.gridData.length - 1; i >= 0; i--) {
        for (var j = this.gridData[i].length - 1; j >= 0; j--) {
          if(this.gridData[i][j].tile) {
            var key = this.gridData[i][j]['material'] + '-' + this.gridData[i][j]['tile'];
            var pkgQty = this.getPackageQty(this.gridData[i][j]['tile']);
            if(tiles[key]) {
              tiles[key].used += 1;
              tiles[key].purchased = pkgQty * Math.ceil(tiles[key].used / pkgQty);
            }else{
              tiles[key] = {
                "purchased": pkgQty,
                "image": "/assets/images/" + tileType + "/" + this.gridData[i][j]['tile'] + "/" + this.gridData[i][j]['material'] + ".png",
                "used": 1,
                "material": this.gridData[i][j]['material'],
                "tile": this.gridData[i][j]['tile']
              }
            }
          }
        }
      }
    }
    return tiles;
  }

  // public getTilesPurchased() {
  //   var pkgQty = this.getPackageQty();
  //   var purchasedTilesArray = this.getTilesPurchasedArray();
  //   var purchasedTiles = 0;

  //   // Round count of unique tiles to nearest factor of pkgQty
  //   // multiply that by the pkgQty and add to the purchasedTiles total.
  //   for(var tile in purchasedTilesArray) {
  //     var tileCount = purchasedTilesArray[tile];
  //     purchasedTiles += pkgQty * Math.ceil(tileCount / pkgQty);
  //   }
  //   // set the number of tiles for this feature.
  //   this.tiles = purchasedTiles;
  //   return purchasedTiles;
  // }

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
