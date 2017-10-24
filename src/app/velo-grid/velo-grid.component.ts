import { Component, OnInit, ViewChild } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-velo-grid',
  templateUrl: './velo-grid.component.html',
  styleUrls: ['./velo-grid.component.css']
})
export class VeloGridComponent implements OnInit {
  context:CanvasRenderingContext2D;
  strokeStyle: string =  "#000000";
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
  }

  ngAfterViewInit() {
    // subscribe to the buildVeloGrid event
    this.feature.onBuildVeloGrid.subscribe( result => {
      this.debug.log('velo-grid-component', 'building the velo grid');
      this.renderGrid();
    });
  }

  renderGrid() {
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
    this.debug.log('velo-grid', 'you clicked on x: ' + x + ' and y: ' + y);
  }

  private createPentagonSection(ctx, adjustmentX, adjustmentY, isOdd, row, column) {
    if(isOdd) {
      // start off 48px off canvas
      this.drawPentagon(ctx, 18 + adjustmentX, 33 + adjustmentY, -Math.PI / 2, row, column);
      this.drawPentagon(ctx, 50 + adjustmentX, 17 + adjustmentY, Math.PI, row, column);
      this.drawPentagon(ctx, 50 + adjustmentX, 49 + adjustmentY, 2 * Math.PI, row, column);
      this.drawPentagon(ctx, 82 + adjustmentX, 33 + adjustmentY, Math.PI / 2, row, column);
    }else{
      this.drawPentagon(ctx, -30 + adjustmentX, 33 + adjustmentY, -Math.PI / 2, row, column);
      this.drawPentagon(ctx, 2 + adjustmentX, 17 + adjustmentY, Math.PI, row, column);
      this.drawPentagon(ctx, 2 + adjustmentX, 49 + adjustmentY, 2 * Math.PI, row, column);
      this.drawPentagon(ctx, 34 + adjustmentX, 33 + adjustmentY, Math.PI / 2, row, column);
    }
  }

  private drawPentagon(ctx, x, y, rotateAngle, row, column) {
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
    // set the fillstyle
    ctx.fillStyle = this.fillStyle;
    // fill the pentagon
    ctx.fill();
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

}
