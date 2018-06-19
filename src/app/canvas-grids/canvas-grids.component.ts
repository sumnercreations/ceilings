import { Component, OnInit } from '@angular/core';
import { DebugService } from '../_services/debug.service';
import { Feature } from '../feature';
import { AlertService } from '../_services/alert.service';
import * as pip from 'point-in-polygon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-canvas-grids',
  templateUrl: './canvas-grids.component.html',
  styleUrls: ['./canvas-grids.component.css']
})
export class CanvasGridsComponent implements OnInit {
  context: CanvasRenderingContext2D;
  strokeStyle = '#cdcdcd';
  fillStyle = '#ffffff';
  canvasWidth = 820;
  canvasHeight = 500;
  newDesign = true;
  guide: any = {
    top: this.sanitizer.bypassSecurityTrustStyle('10'),
    left: this.sanitizer.bypassSecurityTrustStyle('10')
  };

  constructor(
    public debug: DebugService,
    public alert: AlertService,
    public sanitizer: DomSanitizer,
    public feature: Feature
  ) { }

  ngOnInit() {}

  moveGuide(event: any) {
    const x = event.offsetX;
    const y = event.offsetY;

    this.guide = {
      top: this.sanitizer.bypassSecurityTrustStyle(y + 10),
      left: this.sanitizer.bypassSecurityTrustStyle(x + 10)
    };
  }

}
