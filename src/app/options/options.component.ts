import { SeeyondService } from './../_services/seeyond.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
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
export class OptionsComponent implements OnInit {
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
    public dialogRef: MdDialogRef<OptionsComponent>,
    public alert: AlertService,
    public seeyondService: SeeyondService,
    public seeyond: SeeyondFeature,
    public location: Location
  ) { }

  ngOnInit() {
    this.debug.log('options-component', 'init');
    this.debug.log('options-component', this.feature.feature_type);
    const featureType = this.feature.feature_type;
    this.title =  (featureType !== 'hush') ? `${featureType} Design Tool` : `${featureType} Block Design Tool`;
  }

  public goToLanding() {
    this.dialogRef.close('cancel');
    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  public updateGridUnits(units: string) {
    this.debug.log('options-component', 'update grid units: ' + units);
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

}
