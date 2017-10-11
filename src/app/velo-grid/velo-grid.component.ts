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
    this.debug.log('velo-grid-component', canvas);
    this.context = canvas.getContext("2d");
    let numberOfSides = 6,
      size = 25,
      Xcenter = 25,
      Ycenter = 25;

    let ctx = this.context;
    ctx.beginPath();
    ctx.moveTo (Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for (let i = 1; i <= numberOfSides; i++) {
      ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

}
