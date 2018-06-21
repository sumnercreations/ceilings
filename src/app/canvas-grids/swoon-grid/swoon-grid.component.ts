import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasGridsComponent } from './../canvas-grids.component';

@Component({
  selector: 'app-swoon-grid',
  templateUrl: './swoon-grid.component.html',
  styleUrls: ['../canvas-grids.component.css', './swoon-grid.component.css']
})
export class SwoonGridComponent extends CanvasGridsComponent implements OnInit {
  rows = 10;
  columns = 15;
  adjustmentX = 53;
  adjustmentY = 46;

  @ViewChild('swoonCanvas') canvas;

  ngOnInit() {
    this.profile.$buildSwoonGrid.subscribe(result => {
      this.debug.log('swoon-grid-component', 'building the swoon grid');
      this.renderSwoonGrid();
    });
  }

  renderSwoonGrid() {
    this.debug.log('swoon-grid-component', 'rendering the swoon grid');
    const canvas = this.canvas.nativeElement;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;

    // new design
    if (typeof this.feature.gridData === 'undefined') {
      this.feature.gridData = [];
      this.newDesign = true;
    } else {
      this.newDesign = false;
    }

    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.columns; ++c) {
        this.createSwoonSection(ctx, c * this.adjustmentX, r * this.adjustmentY, this.isOdd(r), r, c);
      }
    }
  }

  swoonGridClick(event: any) {
    if (this.feature.quoted) {
      this.alert.error('This design has been quoted.  To make changes you must first save it as a new design.');
      return;
    }
    this.debug.log('swoon-grid-component', event);
    const x = event.offsetX;
    const y = event.offsetY;
    // let foundTile = false;
    this.debug.log('swoon-grid', 'you clicked on x: ' + x + ' and y: ' + y);
  }

  // moveGuide(event: any) {
  //   this.debug.log('swoon-grid-component', 'move grid');
  // }

  // getRoomGuideWidth() {
  //   let guideWidth: number;
  //   if (this.feature.units === 'inches') {
  //     guideWidth = ( this.feature.width / 12 / 2 ) * 48;
  //   } else {
  //     guideWidth = ( this.feature.convertCMtoIN(this.feature.width) / 12 / 2 ) * 48;
  //   }
  //   return guideWidth;
  // }

  // getRoomGuideHeight() {
  //   let guideHeight: number;
  //   if (this.feature.units === 'inches') {
  //     guideHeight = ( this.feature.length / 12 / 2 ) * 48;
  //   } else {
  //     guideHeight = ( this.feature.convertCMtoIN(this.feature.length) / 12 / 2 ) * 48;
  //   }

  //   return guideHeight;
  // }

  // getRoomGuideLeftAdjustment() {
  //   return ( this.canvasWidth - this.getRoomGuideWidth() ) / 2;
  // }

  // getRoomGuideTopAdjustment() {
  //   return ( this.canvasHeight - this.getRoomGuideHeight() ) / 2;
  // }

  private createSwoonSection(ctx, adjustmentX, adjustmentY, isOdd, row, column) {
    this.debug.log('swoon-section', row);
    this.debug.log('swoon-section', column);
    const index = (row * this.columns + column) * 3; // 3 is the number of diamonds needed to make a section
    this.debug.log('swoon-grid-component', index);
    if (isOdd) {
      this.drawDiamond(ctx, 56 + adjustmentX, 18 + adjustmentY, 0, row, column, index + 1);
      this.drawDiamond(ctx, 70 + adjustmentX, 41 + adjustmentY, -Math.PI / 3, row, column, index + 2);
      this.drawDiamond(ctx, 43 + adjustmentX, 41 + adjustmentY, Math.PI / 3, row, column, index + 3);
    } else {
      this.drawDiamond(ctx, 29 + adjustmentX, 18 + adjustmentY, 0, row, column, index + 1);
      this.drawDiamond(ctx, 43 + adjustmentX, 41 + adjustmentY, -Math.PI / 3, row, column, index + 2);
      this.drawDiamond(ctx, 16 + adjustmentX, 41 + adjustmentY, Math.PI / 3, row, column, index + 3);
    }
  }

  private drawDiamond(ctx, x, y, rotateAngle, row, column, index) {
    // this.debug.log('draw-diamond', x);
    // this.debug.log('draw-diamond', y);
    // this.debug.log('draw-diamond', rotateAngle);
    // this.debug.log('draw-diamond', row);
    // this.debug.log('draw-diamond', column);

    // points to create a diamond
    const xcoords = [0, -27, 0, 27];
    const ycoords = [16, 0, -16, 0];

    // create the swoon section
    // add x,y to all the points on the diamond
    const diamond = [];
    for (let i = 0; i < xcoords.length; ++i) {
      diamond[i] = [xcoords[i] + x, ycoords[i] + y];
    }
    // this.debug.log('draw-diamond', diamond);

    if (this.newDesign) {
      this.feature.gridData.push({
        index: index,
        row: row,
        column: column,
        x: x,
        y: y,
        diamond: diamond,
        texture: '',
        rotation: this.toDegrees(rotateAngle),
        material: '',
        tile: '',
        diffusion: ''
      });
    }

    // save current canvas state
    ctx.save();
    // start drawing
    ctx.beginPath();
    // move to the new x,y coordinates (setting a new 0,0 at x,y)
    ctx.translate(x, y);
    // rotate to fit the tesselation
    ctx.rotate(rotateAngle);
    // move to the start of the pentagon and then draw the lines
    ctx.moveTo(xcoords[0], ycoords[0]);
    ctx.lineTo(xcoords[1], ycoords[1]);
    ctx.lineTo(xcoords[2], ycoords[2]);
    ctx.lineTo(xcoords[3], ycoords[3]);
    // close the path
    ctx.closePath();
    // set the strokestyle
    ctx.strokeStyle = this.strokeStyle;

    // if the design is not new, then we can set the fill style from the gridData
    if (!this.newDesign && this.feature.gridData[index].texture !== '') {
      // set the fillstyle
      ctx.fillStyle = this.feature.gridData[index].hex;
      // fill the diamond
      ctx.fill();
      if (this.feature.showGuide) {
        // this.labelTiles(ctx, rotateAngle, index);
      }
    } else {
      ctx.fillStyle = this.fillStyle;
      // fill the diamond
      ctx.fill();
    }

    // DEBUGGING
    ctx.rotate(-rotateAngle);
    ctx.fillStyle = '#00E1E1';
    ctx.font = '10px Arial';
    ctx.fillText(index, -5, -5);
    ctx.font = '8px Arial';
    ctx.fillText(x + ', ' + y, -15, 5);

    // stroke all the pentagon lines
    ctx.stroke();
    // restore the context so that we can draw the next diamond
    ctx.restore();
  }
}
