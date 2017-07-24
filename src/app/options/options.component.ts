import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { DebugService } from './../_services/debug.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  public width: number;
  public length: number;
  public selectedUnits: string = 'inches';
  public size = 24;
  public title = 'Ceilings Design Tool';
  public type: string;

  // debugging
  public params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService
  ) { }

  ngOnInit() {
    this.debug.log('options-component', 'init');

    this.params = this.route.params.subscribe(params => {
      this.type = params['type'];
    });

    this.debug.log('options-component', this.type);
    this.title =  this.ucFirst(this.type) + ' Design Tool';
  }

  public goToLanding() {
    this.router.navigate(['/']);
  }

  public goToDesign() {
    this.router.navigate([this.type + '/design']);
    // this.router.navigate(['/design', this.type]);
  }

  public updateGridMeasurement(measurement: number, name: string, units: string) {
    this.debug.log('options-component', 'measurement: ' + measurement);
    this.debug.log('options-component', 'name: ' + name);
    this.debug.log('options-component', 'units: ' + units);
    if ( units == 'centimeters' && this.selectedUnits != units ) {
      // we need to convert cm to inches.
      this.debug.log('options-component', 'converting cm to in');
      measurement = this.convertCMtoIN(measurement);
    }

    if (name == 'width') {
      this.debug.log('options-component', 'setting width to: ' + measurement);
      this.width = measurement;
    }else if (name == 'length') {
      this.debug.log('options-component', 'setting length to: ' + measurement);
      this.length = measurement
    }else{
      // display a snackbar error message
    }

    this.selectedUnits = units;
  }

  public updateGridUnits(units: string) {
    this.debug.log('options-component', 'update grid units: ' + units);
    if ( units == 'centimeters' && this.selectedUnits != units ) {
      // convert measurements to inches
      this.length = this.convertCMtoIN(this.length);
      this.width = this.convertCMtoIN(this.width);
    }
    // update the units.
    this.selectedUnits = units;
  }

  private convertCMtoIN(cm: number) {
    // 1 cm = 0.393701 in
    var inches: number = 0.393701;
    this.debug.log('options-component', cm + ' is equal to ' + inches + ' inches.');
    return cm * inches;
  }

  private ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
