import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { DebugService } from '../_services/debug.service';
import { ProfileFeature } from './../_features/profile-feature';
import { Feature } from '../_features/feature';
import { AlertService } from '../_services/alert.service';
import * as pip from 'point-in-polygon';

@Component({
  selector: 'app-canvas-grids',
  templateUrl: './canvas-grids.component.html',
  styleUrls: ['./canvas-grids.component.scss']
})
export class CanvasGridsComponent implements OnInit {
  context: CanvasRenderingContext2D;
  strokeStyle = '#cdcdcd';
  fillStyle = '#ffffff';
  canvasWidth = 826;
  canvasHeight = 500;
  swoonCanvasWidth = 2420;
  swoonCanvasHeight = 1400;
  scale = 1;

  newDesign = true;
  // guideTop: any = this.sanitizer.bypassSecurityTrustStyle('10');
  // guideLeft: any = this.sanitizer.bypassSecurityTrustStyle('10');
  guideTop = 100;
  guideLeft = 100;
  gridType: string;
  rulerMultiplier = 24;
  hRulerSections = 17;
  hRulerLabels = [];
  vRulerSections = 10;
  vRulerLabels = [];

  constructor(
    public debug: DebugService,
    public alert: AlertService,
    public sanitizer: DomSanitizer,
    public feature: Feature,
    public route: ActivatedRoute,
    public profile: ProfileFeature
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['type']) {
        this.gridType = params['type'];
        if (this.gridType === 'profile') {
          this.gridType = typeof params['param2'] === 'undefined' || !params['params2'] ? 'swoon' : params['param2'];
        }
        if (this.gridType === 'hush-swoon') {
          this.gridType = 'hushSwoon';
        }
      }
      this.setRulerLabels();
    });
    this.debug.log('canvas-grids:', this.gridType);
  }

  public setRulerLabels() {
    // set multiplier
    switch (this.gridType) {
      case 'velo':
        this.rulerMultiplier = this.feature.units === 'inches' ? 24 : 61;
        break;
      case 'hushSwoon':
        this.rulerMultiplier = this.feature.units === 'inches' ? 12 : 31;
        break;
      default:
        this.rulerMultiplier = this.feature.units === 'inches' ? 24 : 61;
        break;
    }

    // horizontal labels
    for (let ii = 0; ii < this.hRulerSections; ii++) {
      this.hRulerLabels.push(ii * this.rulerMultiplier);
    }
    // vertical labels
    for (let jj = 0; jj < this.vRulerSections; jj++) {
      this.vRulerLabels.push(jj * this.rulerMultiplier);
    }
  }

  public moveGuide(event: any) {
    const x = event.offsetX;
    const y = event.offsetY;

    this.guideTop = y + 10;
    this.guideLeft = x + 10;

    // this.guideTop = this.sanitizer.bypassSecurityTrustStyle(y + 10);
    // this.guideLeft = this.sanitizer.bypassSecurityTrustStyle(x + 10);

    console.log(this.guideTop, this.guideLeft);
  }

  public toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  public toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  public isOdd(column: number) {
    return column % 2;
  }
}
