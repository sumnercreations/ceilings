import { Component, OnInit } from '@angular/core';
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
  canvasWidth = 820;
  canvasHeight = 500;
  newDesign = true;
  guide: any = {
    top: this.sanitizer.bypassSecurityTrustStyle('10'),
    left: this.sanitizer.bypassSecurityTrustStyle('10')
  };
  gridType: string;

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
          this.gridType = params['param2'];
        }
      }
    });
    console.log('gridType:', this.gridType);
  }

  public moveGuide(event: any) {
    const x = event.offsetX;
    const y = event.offsetY;

    this.guide = {
      top: this.sanitizer.bypassSecurityTrustStyle((y + 10).toString()),
      left: this.sanitizer.bypassSecurityTrustStyle((x + 10).toString())
    };
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
