import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DebugService } from './../_services/debug.service';
// import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { OptionsComponent } from '../options/options.component';
import { Feature } from '../feature';

@Component({
  // selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  optionsDialogRef: MdDialogRef<any>;
  position = 'above';
  boxesW: number;
  boxesL: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    public feature: Feature,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
    this.route.params.subscribe(params => {
      this.feature.feature_type = params['type'];
    });
  }

  ngAfterViewInit() {
    this.debug.log('design-component', 'afterViewInit');
    if(this.feature.width == 0 || this.feature.length == 0) {
      this.editOptions();
    }
  }

  public editOptions() {
    // load a dialog to edit the options
    var config = new MdDialogConfig();
    // config.disableClose = true;
    this.optionsDialogRef = this.dialog.open(OptionsComponent, config);
    this.optionsDialogRef.afterClosed().subscribe(result => {
      this.debug.log('design-component', 'result is: ' + result);
      this.buildGrid();
    });
  }

  // grid will be it's own component
  private buildGrid() {
    // we need 1 box for every 2 feet
    // 48px x 48px = 2 feet
    // I think we should round this up to the nearest factor of 2
    this.boxesW = Math.ceil(this.feature.width / 12 / 2);
    this.boxesL = Math.ceil(this.feature.length / 12 / 2);
  }

}
