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
      this.updateGrid();
    });
  }

  updateGrid() {
    let canvas = this.canvas.nativeElement;
    canvas.width = 820;
    canvas.height = 500;

    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;

    let rows = 10;
    let columns = 9;
    let adjustmentX = 96;
    let adjustmentY = 48;

    for (var r = 0; r < rows; ++r) {
      for (var c = 0; c < columns; ++c) {
        this.createPentagonSection(ctx, c * adjustmentX, r * adjustmentY, this.isOdd(r));
      }
    }
  }

  private createPentagonSection(ctx, adjustmentX, adjustmentY, isOdd) {
    this.debug.log('velo-grid', isOdd);
    if(isOdd) {
      // start off 48px off canvas
      this.drawPentagon(ctx, 18 + adjustmentX, 33 + adjustmentY, -Math.PI / 2);
      this.drawPentagon(ctx, 50 + adjustmentX, 17 + adjustmentY, Math.PI);
      this.drawPentagon(ctx, 50 + adjustmentX, 49 + adjustmentY, 2 * Math.PI);
      this.drawPentagon(ctx, 82 + adjustmentX, 33 + adjustmentY, Math.PI / 2);
    }else{
      this.drawPentagon(ctx, -30 + adjustmentX, 33 + adjustmentY, -Math.PI / 2);
      this.drawPentagon(ctx, 2 + adjustmentX, 17 + adjustmentY, Math.PI);
      this.drawPentagon(ctx, 2 + adjustmentX, 49 + adjustmentY, 2 * Math.PI);
      this.drawPentagon(ctx, 34 + adjustmentX, 33 + adjustmentY, Math.PI / 2);
    }
  }

  private drawPentagon(ctx, x, y, rotateAngle) {
    // save the current canvas state
    ctx.save();

    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(rotateAngle);
    ctx.moveTo(0, 2*7.97);
    ctx.lineTo(2*-11.95, 2*3.98);
    ctx.lineTo(2*-7.975, 2*-7.97);
    ctx.lineTo(2*7.975, 2*-7.97);
    ctx.lineTo(2*11.95, 2*3.98);
    ctx.closePath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.restore();
  }

  private toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  private isOdd(column: number) {
    return column % 2;
  }

}
