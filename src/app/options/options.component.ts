import { Subject } from 'rxjs';
import { ClarioGridsService } from './../_services/clario-grids.service';
import { MaterialsService } from 'app/_services/materials.service';
import { SeeyondService } from './../_services/seeyond.service';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../_features/feature';
import { SeeyondFeature } from '../_features/seeyond-feature';
import { AlertService } from 'app/_services/alert.service';
import { Location } from '@angular/common';
import { ProfileFeature } from '../_features/profile-feature';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, AfterContentInit, OnDestroy {
  public ngUnsubscribe: Subject<any> = new Subject();
  public title = 'Ceilings Design Tool';
  public modifyToolsArray = ['rotate', 'remove'];

  public fixturesToolsArray = ['light', 'vent', 'sprinkler'];

  public showProjectName = true;
  public showDimensions = false;
  public showSeeyondFeatureSelection = false;
  public showSeeyondDimensions = false;
  public showProfileFeatureSelection = false;
  public showClarioTileSizes = false;

  // debugging
  public params: any;

  constructor(
    public router: Router,
    public debug: DebugService,
    public feature: Feature,
    public dialogRef: MatDialogRef<OptionsComponent>,
    public alert: AlertService,
    public seeyondService: SeeyondService,
    public seeyond: SeeyondFeature,
    public location: Location,
    public materials: MaterialsService,
    public clarioGrids: ClarioGridsService,
    public profile: ProfileFeature
  ) {}

  ngOnInit() {
    this.debug.log('options-component', 'init');
    this.debug.log('options-component', this.feature.feature_type);
    if (this.feature.feature_type === 'clario') {
      setTimeout(() => {
        this.clarioGridSizeChanged(this.feature.grid_type);
      });
    }
    switch (this.feature.feature_type) {
      case 'seeyond':
        this.showSeeyondFeatureSelection = true;
        this.showSeeyondDimensions = true;
        break;
      case 'tetria':
        this.showDimensions = true;
        break;
      case 'clario':
        this.showClarioTileSizes = true;
        this.showDimensions = true;
        break;
      case 'hush':
        this.showDimensions = true;
        break;
      case 'velo':
        break;
      case 'profile':
        this.showProfileFeatureSelection = true;
        break;
    }
  }

  ngAfterContentInit() {
    const featureType = this.feature.feature_type;
    this.title = featureType !== 'hush' ? `${featureType} Design Tool` : `${featureType} Blocks Design Tool`;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.showProjectName = true;
    this.showDimensions = false;
    this.showSeeyondFeatureSelection = false;
    this.showSeeyondDimensions = false;
    this.showProfileFeatureSelection = false;
    this.showClarioTileSizes = false;
  }

  public goToLanding() {
    if (this.feature.feature_type === 'seeyond') {
      this.seeyond.resetSeeyond();
    }
    this.dialogRef.close('cancel');
    this.feature.navToLanding();
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
    const valid =
      this.feature.width === 0 ||
      typeof this.feature.width === 'undefined' ||
      (this.feature.length === 0 || typeof this.feature.length === 'undefined') ||
      typeof this.feature.design_name === 'undefined'
        ? true
        : false;

    return valid;
  }

  goToQty() {
    const pathname = window.location.pathname.replace(/\/design/g, '/quantity');
    this.router.navigate([pathname]);
    this.dialogRef.close('cancel');
  }

  updateSelectedProfileFeature(feature) {
    console.log('updateSelectedFeature:', feature);
    if (this.profile.tilesFeatures.includes(feature)) {
      if (this.router.url.indexOf('tiles') < 0) {
        this.location.go(`${this.router.url}/tiles/${feature}`);
      }
    }
    this.profile.updateProfileFeature(feature);

    // this.seeyond.updateSeeyondFeature(feature);zz
  }

  startDesigning() {
    // TODO: make this dynamic for all features
    console.log('startDesigning');
    this.profile.buildFeatureGrid();
    this.dialogRef.close();
  }

  clarioGridSizeChanged(selection) {
    if (!!this.feature.gridData) {
      this.feature.clearAll();
    }
    this.clarioGrids.gridSizeSelected(selection);
  }

  clarioTileSizeChanged(selection) {
    if (!!this.feature.gridData) {
      this.feature.clearAll();
    }
    this.clarioGrids.tileSizeSelected(selection);
  }
}
