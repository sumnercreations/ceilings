import { ClarioGridsService } from './../_services/clario-grids.service';
import { MaterialsService } from 'app/_services/materials.service';
import { SeeyondService } from './../_services/seeyond.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { SeeyondFeature } from '../seeyond-feature';
import { AlertService } from 'app/_services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, AfterContentInit {
  public title = 'Ceilings Design Tool';
  public modifyToolsArray = [
    'rotate',
    'remove'
  ];

  public fixturesToolsArray = [
    'light',
    'vent',
    'sprinkler'
  ];

  // debugging
  public params: any;

  constructor(
    private router: Router,
    private debug: DebugService,
    public feature: Feature,
    public dialogRef: MatDialogRef<OptionsComponent>,
    public alert: AlertService,
    public seeyondService: SeeyondService,
    public seeyond: SeeyondFeature,
    public location: Location,
    public materials: MaterialsService,
    public clarioGrids: ClarioGridsService
  ) { }

  ngOnInit() {
    this.debug.log('options-component', 'init');
    this.debug.log('options-component', this.feature.feature_type);
  }

  ngAfterContentInit() {
    const featureType = this.feature.feature_type;
    this.title =  (featureType !== 'hush') ? `${featureType} Design Tool` : `${featureType} Blocks Design Tool`;
  }

  public goToLanding() {
    if (this.feature.feature_type === 'seeyond') { this.seeyond.resetSeeyond(); }
    this.dialogRef.close('cancel');
    this.location.go('/');
    window.location.reload();
    // this.dialogRef.afterClosed().subscribe(result => {
    //   this.router.navigate(['/']);
    // });
  }

  public updateGridUnits(units: string) {
    this.debug.log('options-component', 'update grid units: ' + units);
    if (this.feature.feature_type === 'seeyond') {
      this.seeyond.convertDimensionsUnits(units);
      this.seeyond.setMaxMinDimensions(units);
    }
    this.feature.updateGridUnits(units);
  }

  validateOptions() {
    // name, width, and length are required
    const valid = (this.feature.width === 0 || typeof this.feature.width === 'undefined')
             || (this.feature.length === 0 || typeof this.feature.length === 'undefined')
             || (typeof this.feature.design_name === 'undefined')
              ? true : false;

    return valid;
  }

  goToQty() {
    const pathname = window.location.pathname.replace(/\/design/g, '/quantity');
    this.router.navigate([pathname]);
    this.dialogRef.close('cancel');
  }
}
