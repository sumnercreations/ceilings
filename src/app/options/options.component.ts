import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';

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
    public dialogRef: MdDialogRef<OptionsComponent>
  ) { }

  ngOnInit() {
    this.debug.log('options-component', 'init');

    this.debug.log('options-component', this.feature.feature_type);
    this.title =  this.feature.feature_type + ' Design Tool';
  }

  public goToLanding() {
    this.dialogRef.close('cancel');
    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  public updateGridUnits(units: string) {
    this.debug.log('options-component', 'update grid units: ' + units);
    // if ( units == 'centimeters' && this.feature.units != units ) {
    //   // convert measurements to inches
    //   this.feature.length = this.convertCMtoIN(this.feature.length);
    //   this.feature.width = this.convertCMtoIN(this.feature.width);
    // }
    // update the units.
    this.feature.units = units;
  }

  private validateOptions() {
    // name, width, and length are required
    if((this.feature.width == 0 || typeof this.feature.width == 'undefined') || (this.feature.length == 0 || typeof this.feature.length == 'undefined') || (typeof this.feature.design_name == 'undefined')) {
      return true;
    }else{
      return false;
    }
  }

}
