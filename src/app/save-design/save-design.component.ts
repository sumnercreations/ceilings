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

  constructor(
    private router: Router,
    private alert: AlertService,
    private api: ApiService,
    public feature: Feature,
    public seeyondApi: SeeyondService,
    public seeyond: SeeyondFeature,
    public user: User,
  ) { }

  ngOnInit() {
    // if the design already has an ID then it's not new.
    this.newDesign = this.feature.id ? false : true;
  }

  newButtonClick() {
    this.newButton = true;
  }

  trySave() {
    if (this.feature.feature_type === 'seeyond') {
      this.saveSeeyond();
    } else {
      this.saveFeature();
    }
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
        const url = this.router.createUrlTree([this.feature.feature_type + '/design', this.feature.id]).toString();
        if (url !== this.router.url) {
          this.router.navigate([this.feature.feature_type + '/design', this.feature.id]);
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
      this.router.navigate([this.feature.feature_type + '/design', this.feature.id]);
    });
  }

  saveSeeyond() {
    if (this.newDesign || this.newButton) {
      this.saveNewSeeyond();
    }else {
      this.seeyondApi.updateFeature().subscribe(feature => {
        // notify the user that we saved their design
        this.alert.success('Successfully saved your design');
        // set the feature up according to what is returned from the API after save.
        this.seeyond = feature.seeyond;
        // navigate if the current path isn't already right
        const url = this.router.createUrlTree(['/feature', this.feature.id]).toString();
        if (url !== this.router.url) {
          this.router.navigate(['/feature', this.feature.id]);
        }
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
      // set the feature up according to what is returned from the API after save.
      // this.seeyond = feature.seeyond;
      // redirect to the new design
      this.router.navigate(['/seeyond/design', feature.seeyond.id]);
    });
  }

}
