import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { GridSection } from './../_models/grid-section';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public rows: any;
  public columns: any;
  public mouseIsDown: boolean = false;

  constructor(
    private debug: DebugService,
    private sanitizer: DomSanitizer,
    private alert: AlertService,
    public feature: Feature
  ) { }

  ngOnInit() {
    // subscribe to the buildGrid event
    this.debug.log('grid-component', 'setting grid Subscription');
    this.feature.onBuildGrid.subscribe( result => {
      this.debug.log('grid-component', 'building the grid');
      this.updateGrid();
    });

    // subscribe to the applyAll event
    this.feature.onApplyAll.subscribe( result => {
      this.debug.log('grid-component', 'applying all');
      this.updateGrid(true);
    });
  }

  updateGrid(applyAll: boolean = false) {
    this.rows = new Array(this.feature.getRows());
    this.columns = new Array(this.feature.getColumns());

    // new design
    if(typeof this.feature.gridData == 'undefined') {
      this.feature.gridData = [];
      this.debug.log('grid-component', 'gridData is undefined');
      for(var r: number = 0; r < this.rows.length; r++) {
        this.feature.gridData[r] = [];
        for(var c: number = 0; c < this.columns.length; c++) {
          this.feature.gridData[r][c] = new GridSection(r, c);
        }
      }
    }else{
      // Loaded design or design with gridData already set.
      for(var r: number = 0; r < this.rows.length; r++) {
        if(typeof this.feature.gridData[r] == 'undefined') {
          // create new row
          this.feature.gridData[r] = [];
        }
        for(var c: number = 0; c < this.columns.length; c++) {
          if(applyAll) {
            // de-select any tools just in case
            this.feature.selectedTool = '';
            this.setFlag(r, c);
            // this.updateTile(r, c);
            this.removeFlag(r, c);
          }else{
            if(typeof this.feature.gridData[r][c] ==  'undefined') {
              // create a new record for the column
              this.debug.log('grid-component', 'the row does not exist. create a new one.');
              this.feature.gridData[r][c] = new GridSection(r, c);
            }else{
              this.feature.gridData[r][c] = new GridSection(
                r,
                c,
                this.feature.gridData[r][c]['backgroundImage'],
                this.feature.gridData[r][c]['texture'],
                this.feature.gridData[r][c]['rotation'],
                this.feature.gridData[r][c]['material'],
                this.feature.gridData[r][c]['tile'],
              );
            }
          }
        }
      }
    }
  }

  setFlag(row, column) {
    this.debug.log('grid-component', 'setting flag');
    this.mouseIsDown = true;
    this.updateTile(row, column);
  }

  removeFlag(row, column) {
    this.debug.log('grid-component', 'removing flag');
    this.mouseIsDown = false;
  }

  updateTile(row, column) {
    if(this.mouseIsDown){
      this.debug.log('grid-component', 'updating tile: ' + row + ' | ' + column);
      this.debug.log('grid-component', 'tool: ' + this.feature.selectedTool);
      this.debug.log('grid-component', 'tile: ' + this.feature.selectedTile);
      this.debug.log('grid-component', 'material: ' + this.feature.material);

      switch (this.feature.selectedTool) {
        case "rotate":
          let rotation = this.feature.gridData[row][column].rotation;
          rotation = rotation + 90 == 360 ? 0 : rotation + 90;
          this.feature.gridData[row][column].setRotation(rotation);
          this.debug.log('grid-component', rotation);
          break;

        case "remove":
          this.feature.gridData[row][column] = new GridSection(row, column);
          this.debug.log('grid-component', this.feature.gridData[row][column]);
          break;

        case "vent":
          this.feature.gridData[row][column].setBackgroundImage("url(/assets/icons/tools/vent.png)");
          this.feature.gridData[row][column].setTexture("/assets/icons/tools/vent-white.png");
          this.feature.gridData[row][column].setTile("");
          this.debug.log('grid-component', this.feature.gridData[row][column]);
          break;

        case "light":
          this.feature.gridData[row][column].setBackgroundImage("url(/assets/icons/tools/light.png), url(/assets/images/tiles/00/" + this.feature.material + ".png");
          this.feature.gridData[row][column].setTexture("/assets/images/tiles/00/light/" + this.feature.material + ".png");
          this.feature.gridData[row][column].setTile("00");
          this.debug.log('grid-component', this.feature.gridData[row][column]);
          break;

        case "sprinkler":
          this.feature.gridData[row][column].setBackgroundImage("url(/assets/icons/tools/sprinkler.png), url('/assets/images/tiles/00/" + this.feature.material + ".png')");
          this.feature.gridData[row][column].setTexture("/assets/images/tiles/00/sprinkler/" + this.feature.material + ".png");
          this.feature.gridData[row][column].setTile("00");
          this.debug.log('grid-component', this.feature.gridData[row][column]);
          break;

        // when no tool is selected
        default:
          // outside edges can only be flat tiles
          if( (this.getGridHeight() != this.getRoomGuideHeight() && ( row == 0 || row == this.feature.getRows() - 1)) || (this.getGridWidth() != this.getRoomGuideWidth() && ( column == 0 || column == this.feature.getColumns() -1)) ) {
            this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/tiles/00/' + this.feature.material + '.png)');
            this.feature.gridData[row][column].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');
            this.feature.gridData[row][column].setTile('00');
            this.feature.gridData[row][column].setMaterial(this.feature.material);
            this.alert.error("Tiles on the outside must be flat.");
          }else{
            // specific tile for each feature type
            if(this.feature.feature_type == 'tetria') {
              this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/tiles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
              this.feature.gridData[row][column].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');
              this.feature.gridData[row][column].setTile(this.feature.selectedTile);
              this.feature.gridData[row][column].setMaterial(this.feature.material);
              this.debug.log('grid-component', this.feature.gridData[row][column]);
            }else if(this.feature.feature_type == 'clario') {
              if(this.feature.selectedTile == "00") {
                this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/tiles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
                this.feature.gridData[row][column].setTile('00');
                this.feature.gridData[row][column].setTile(this.feature.selectedTile);
                this.feature.gridData[row][column].setMaterial(this.feature.material);
                this.debug.log('grid-component', this.feature.gridData[row][column]);
              }else if(this.feature.selectedTile == "24") {
                // 24x24 baffle
                this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/baffles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
                // the 3D view just needs the flat tile for the texture to be applied to the
                // geometry that it creates.
                this.feature.gridData[row][column].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');

                this.feature.gridData[row][column].setTile(this.feature.selectedTile);
                this.feature.gridData[row][column].setMaterial(this.feature.material);
                // for 24x24 tiles in a 24x48 grid
                if(this.feature.tile_size == 48) {
                  this.feature.gridData[row][column].setRotation(270);
                }
                this.debug.log('grid-component', this.feature.gridData[row][column]);
              }else if(this.feature.selectedTile == "48") {
                // 24x48 baffle
                this.debug.log('grid-component', 'is perfect grid: ' + this.isPerfectGrid());
                this.debug.log('grid-component', 'is column odd: ' + this.isOdd(column));
                if(this.isPerfectGrid() && this.isOdd(column)) {
                  this.debug.log('grid-component', 'this and column to left');
                  this.set48TileLeft(row, column);
                }else if(this.isPerfectGrid() && !this.isOdd(column)) {
                  this.set48TileRight(row, column);
                  this.debug.log('grid-component', 'this and column to right');
                }else if(!this.isPerfectGrid() && !this.isOdd(column)) {
                  this.set48TileLeft(row, column);
                }else{
                  this.set48TileRight(row, column);
                }
              }
            }else{
              // must be velo
              this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/velo/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
              this.feature.gridData[row][column].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');
              this.feature.gridData[row][column].setTile(this.feature.selectedTile);
              this.feature.gridData[row][column].setMaterial(this.feature.material);
              this.debug.log('grid-component', this.feature.gridData[row][column]);
            }
          }
          break;
      }
      if(this.feature.selectedTool != 'rotate') {
        // update the estimated amount
        this.feature.updateEstimatedAmount();
      }
    }
  }

  /**
   * Returns the background image style value.
   * Because we send 2 urls for the background images whenever they choose a
   * light or a sprinkler, we need to ignore the style sanitation.
   * @param number row    the row number
   * @param number column the column number
   * @return safe style string for the background image.
   */
  getTileBackgroundImage(row, column) {
    return this.sanitizer.bypassSecurityTrustStyle(this.feature.gridData[row][column].backgroundImage);
  }

  getTileRotation(row, column) {
    return this.feature.gridData[row][column].rotation;
  }

  getGridWidth() {
    return this.feature.getColumns() * 48;
    // return Math.ceil( this.feature.width / 12 / 2 ) * 48;
  }

  getGridHeight() {
    return this.feature.getRows() * 48;
    // return Math.ceil( this.feature.length / 12 / 2 ) * 48;
  }

  getRoomGuideWidth() {
    var guideWidth: number;
    if(this.feature.units == 'inches') {
      guideWidth = ( this.feature.width / 12 / 2 ) * 48;
    }else{
      guideWidth = ( this.feature.convertCMtoIN(this.feature.width) / 12 / 2 ) * 48;
    }
    return guideWidth;
  }

  getRoomGuideHeight() {
    var guideHeight: number;
    if(this.feature.units == 'inches') {
      guideHeight = ( this.feature.length / 12 / 2 ) * 48;
    }else{
      guideHeight = ( this.feature.convertCMtoIN(this.feature.length) / 12 / 2 ) * 48;
    }

    return guideHeight;
  }

  getRoomGuideLeftAdjustment() {
    return ( this.getGridWidth() - this.getRoomGuideWidth() ) / 2;
  }

  getRoomGuideTopAdjustment() {
    return ( this.getGridHeight() - this.getRoomGuideHeight() ) / 2;
  }

  isPerfectGrid() {
    return this.getGridWidth() == this.getRoomGuideWidth();
  }

  isOdd(column: number) {
    return column % 2;
  }

  set48TileRight(row, column) {
    // this and the column to the right must match
    if(column+1 == this.feature.getColumns() - 1) {
      this.debug.log('grid-component', 'the column to the right of this must be flat, so this can not be 48 tile');
      this.alert.error("This tile must be a 24x24 tile");
      return;
    }
    this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/baffles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
    this.feature.gridData[row][column+1].setBackgroundImage('url(/assets/images/baffles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
    this.feature.gridData[row][column].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');
    this.feature.gridData[row][column+1].setTexture('');

    this.feature.gridData[row][column].setTile(this.feature.selectedTile);
    this.feature.gridData[row][column].setMaterial(this.feature.material);
    this.debug.log('grid-component', this.feature.gridData[row][column]);
  }

  set48TileLeft(row, column) {
    // odd column. this and the column to the left must match
    this.feature.gridData[row][column].setBackgroundImage('url(/assets/images/baffles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
    this.feature.gridData[row][column].setTexture('');
    this.feature.gridData[row][column-1].setBackgroundImage('url(/assets/images/baffles/'+ this.feature.selectedTile + '/'+ this.feature.material + '.png)');
    this.feature.gridData[row][column-1].setTexture('/assets/images/tiles/00/' + this.feature.material + '.png');
    this.feature.gridData[row][column-1].setTile(this.feature.selectedTile);
    this.feature.gridData[row][column-1].setMaterial(this.feature.material);
    this.debug.log('grid-component', this.feature.gridData[row][column]);
  }

}
