import { MatDialogRef } from '@angular/material';
import { Location } from '@angular/common';
import { SeeyondFeature } from './../seeyond-feature';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { AlertService } from '../_services/alert.service';
import { ApiService } from '../_services/api.service';
import { SeeyondService } from '../_services/seeyond.service';


@Component({
  selector: 'app-save-design',
  templateUrl: './save-design.component.html',
  styleUrls: ['./save-design.component.css']
})
export class SaveDesignComponent implements OnInit {
  public newDesign: boolean;
  public newButton = false;
  private uiType = this.feature.is_quantity_order ? '/quantity' : '/design';

  constructor(
    private router: Router,
    private alert: AlertService,
    private api: ApiService,
    public feature: Feature,
    public seeyondApi: SeeyondService,
    public seeyond: SeeyondFeature,
    public user: User,
    private location: Location,
    private dialogRef: MatDialogRef<SaveDesignComponent>
  ) { }

  ngOnInit() {
    // if the design already has an ID then it's not new.
    if (this.feature.feature_type === 'seeyond') { this.feature = this.seeyond; }
    this.newDesign = this.feature.id ? false : true;
  }

  newButtonClick() {
    this.newButton = true;
  }

  saveInvoked() {
    if (!!this.seeyond.seeyond_feature_type) {
      this.saveSeeyond();
    } else {
      this.saveFeature();
    }
    this.dialogRef.close()
  }

  saveFeature() {
    if (this.newDesign || this.newButton) {
      this.saveNew();
    } else {
      this.api.updateDesign().subscribe(feature => {
        // notify the user that we have saved their design
        this.alert.success('Successfully saved your design');
        // set the feature to what was returned from the API.
        this.feature = feature.ceiling;
        // navigate if the current path isn't already right
        const url = this.router.createUrlTree([`${this.feature.feature_type}${this.uiType}`, this.feature.id]).toString();
        if (url !== this.router.url) {
          this.router.navigate([`${this.feature.feature_type}${this.uiType}`, this.feature.id]);
        }
      });
    }
  }

  saveNew() {
    // reset some values for the new quote
    this.feature.quoted = false;
    this.api.saveDesign().subscribe(feature => {
      // notify the user that we have saved their design
      this.alert.success('Successfully saved your design');
      // set the feature to what was returned from the API.
      this.feature = feature.ceiling;
      // redirect to the new design
      this.router.navigate([`${this.feature.feature_type}${this.uiType}`, this.feature.id]);
    });
  }

  saveSeeyond() {
    if (this.newDesign || this.newButton) {
      this.saveNewSeeyond();
    }else {
      this.seeyondApi.updateFeature().subscribe(feature => {
        // notify the user that we saved their design
        this.alert.success('Successfully saved your design');
        // redirect to the new design
        this.location.go(`seeyond/design/${feature.seeyond.name}/${feature.seeyond.id}`);
      });
    }
  }

  saveNewSeeyond() {
    // reset some values for the new quote
    this.seeyond.quoted = false;
    this.seeyond.project_name = null;
    this.seeyond.specifier = null;
    this.seeyondApi.saveFeature().subscribe(feature => {
      // notify the user that we saved their design
      this.alert.success('Successfully saved your design');
      // redirect to the new design
      this.router.navigate(['/seeyond/design', feature.seeyond.id]);
    });
  }

}
