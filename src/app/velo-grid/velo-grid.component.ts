import { Component, OnInit, ViewChild } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { AlertService } from '../_services/alert.service';
import * as pip from 'point-in-polygon';

@Component({
  selector: 'app-velo-grid',
  templateUrl: './velo-grid.component.html',
  styleUrls: ['./velo-grid.component.css']
})
export class VeloGridComponent implements OnInit {
  context:CanvasRenderingContext2D;
  strokeStyle: string =  "#cdcdcd";
  fillStyle: string =  "#ffffff";
  canvasWidth: number = 820;
  canvasHeight: number = 500;
  newDesign: boolean = true;

  @ViewChild("veloCanvas") canvas;

  constructor(
    private debug: DebugService,
    private alert: AlertService,
    public feature: Feature
  ) { }

  ngOnInit() {
    // subscribe to the buildVeloGrid event
    this.debug.log('velo-grid', 'setting veloGrid Subscription');
    this.feature.onBuildVeloGrid.subscribe( result => {
      this.debug.log('velo-grid-component', 'building the velo grid');
      this.renderGrid();
    });
  }

  renderGrid() {
    this.debug.log('velo-grid-component', 'rendering the velo grid');
    let canvas = this.canvas.nativeElement;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;

    let rows = 10;
    let columns = 9;
    let adjustmentX = 96;
    let adjustmentY = 48;

    // new design
    if(typeof this.feature.gridData == 'undefined') {
      this.feature.gridData = []
      this.newDesign = true;
    }else{
      this.newDesign = false;
    }
    for (var r = 0; r < rows; ++r) {
      for (var c = 0; c < columns; ++c) {
        this.createPentagonSection(ctx, c * adjustmentX, r * adjustmentY, this.isOdd(r), r, c);
      }
    }
  }

  gridClick(event: any) {
    let x = event.layerX;
    let y = event.layerY;
    let foundTile: boolean = false;
    this.debug.log('velo-grid', 'you clicked on x: ' + x + ' and y: ' + y);
    for (var el in this.feature.gridData) {
      if(!foundTile && pip([x, y], this.feature.gridData[el].pentagon)) {
        // removing a tile
        if(this.feature.selectedTool == 'remove') {
          // reset the texture for the 3D view.
          this.feature.gridData[el].texture = '';
          // reset the tile
          this.feature.gridData[el].tile = '';
          // reset material
          this.feature.gridData[el].material = '';
          // reset materialType
          this.feature.gridData[el].materialType = '';
          // reset hex color value
          this.feature.gridData[el].hex = '';
          this.debug.log('velo-grid', this.feature.gridData[el]);
          // set the tile found true so we don't "find" another one that's close
          foundTile = true;
        }else{
          // set the texture for the 3D view.
          this.feature.gridData[el].texture = '/assets/images/tiles/00/' + this.feature.material + '.png';
          // set the tile
          this.feature.gridData[el].tile = this.feature.selectedTile;
          // set material
          this.feature.gridData[el].material = this.feature.material;
          // set materialType
          this.feature.gridData[el].materialType = this.feature.materialType;
          // set hex color value
          this.feature.gridData[el].hex = this.feature.materialHex;
          this.debug.log('velo-grid', this.feature.gridData[el]);
          // set the tile found true so we don't "find" another one that's close
          foundTile = true;
        }
        // render the canvas again
        this.renderGrid();
      }
    }
  }

  private createPentagonSection(ctx, adjustmentX, adjustmentY, isOdd, row, column) {
    let index = (row * 9 + column) * 4;
    if(isOdd) {
      // start off 48px off canvas
      this.drawPentagon(ctx, 18 + adjustmentX, 33 + adjustmentY, -Math.PI / 2, row, column, index);
      this.drawPentagon(ctx, 50 + adjustmentX, 17 + adjustmentY, Math.PI, row, column, index + 1);
      this.drawPentagon(ctx, 50 + adjustmentX, 49 + adjustmentY, 2 * Math.PI, row, column, index + 2);
      this.drawPentagon(ctx, 82 + adjustmentX, 33 + adjustmentY, Math.PI / 2, row, column, index + 3);
    }else{
      this.drawPentagon(ctx, -30 + adjustmentX, 33 + adjustmentY, -Math.PI / 2, row, column, index);
      this.drawPentagon(ctx, 2 + adjustmentX, 17 + adjustmentY, Math.PI, row, column, index + 1);
      this.drawPentagon(ctx, 2 + adjustmentX, 49 + adjustmentY, 2 * Math.PI, row, column, index + 2);
      this.drawPentagon(ctx, 34 + adjustmentX, 33 + adjustmentY, Math.PI / 2, row, column, index + 3);
    }
  }

  private drawPentagon(ctx, x, y, rotateAngle, row, column, index) {
    // pentagon points
    let xcoords = [0, -23.9, -15.95, 15.95, 23.9];
    let ycoords = [15.94, 7.96, -15.94, -15.94, 7.96];

    // set the grid section information
    // add x,y to all the pentagon points
    let pentagon = [];
    for (var i = 0; i < xcoords.length; ++i) {
      pentagon[i] = [ xcoords[i] + x, ycoords[i] + y ];
    }

    if(this.newDesign) {
      this.feature.gridData.push({
        "index": index,
        "row": row,
        "column": column,
        "x": x,
        "y": y,
        "pentagon": pentagon,
        "texture": '',
        "rotation": rotateAngle,
        "material": '',
        "tile": ''
      });
    }

    // save the current canvas state
    ctx.save();
    // start drawing
    ctx.beginPath();
    // move to the new x,y coordinates (setting a new 0,0 at x,y)
    ctx.translate(x,y);
    // rotate to fit in the tesselation
    ctx.rotate(rotateAngle);
    // move to the start of the pentagon and then set the lines
    ctx.moveTo(xcoords[0], ycoords[0]);
    ctx.lineTo(xcoords[1], ycoords[1]);
    ctx.lineTo(xcoords[2], ycoords[2]);
    ctx.lineTo(xcoords[3], ycoords[3]);
    ctx.lineTo(xcoords[4], ycoords[4]);
    // close the path
    ctx.closePath();
    // set the strokestyle
    ctx.strokeStyle = this.strokeStyle;

    // if the design is not new, then we can set fill style from gridData
    if(!this.newDesign && this.feature.gridData[index].texture != '') {
      // set the fillstyle
      // ctx.fillStyle = '#ff9933';
      ctx.fillStyle = this.feature.gridData[index].hex;
      // fill the pentagon
      ctx.fill();
      // rotate back so the text is always top down
      ctx.rotate(-rotateAngle);
      // change fillStyle for the font (cyan)
      ctx.fillStyle = '#00E1E1';
      ctx.font = '16px Arial';
      ctx.fillText(this.materialTypeAbbreviation(this.feature.gridData[index].materialType), -5, 0);
      ctx.font = '10px Arial';
      ctx.fillText(this.tileAbbreviation(this.feature.gridData[index].tile), -8, 10);
    }else{
      ctx.fillStyle = this.fillStyle;
      // fill the pentagon
      ctx.fill();
    }

    // stroke all the pentagon lines
    ctx.stroke();
    // restore the context so that we can draw the next pentagon.
    ctx.restore();
  }

  private toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  private isOdd(column: number) {
    return column % 2;
  }

  private tileAbbreviation(tile) {
    this.debug.log('tile-abbreviation', tile);
    let abbreviation: string;
    switch (tile) {
      case "concave":
        abbreviation = "CC";
        break;

      case "convex":
        abbreviation = "CV";
        break;

      default:
        this.alert.error("Unknown tile: " + tile);
        break;
    }
    return abbreviation;
  }

  private materialTypeAbbreviation(materialType) {
    let abbreviation: string;
    switch (materialType) {
      case "felt":
        abbreviation = 'F';
        break;

      case "varia":
        abbreviation = 'V';
        break;

      default:
        this.alert.error("Unknown material type: " + materialType);
        break;
    }
    return abbreviation;
  }

}
