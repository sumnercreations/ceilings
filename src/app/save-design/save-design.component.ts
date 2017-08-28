import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { AlertService } from '../_services/alert.service';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-save-design',
  templateUrl: './save-design.component.html',
  styleUrls: ['./save-design.component.css']
})
export class SaveDesignComponent implements OnInit {
  public newDesign: boolean;
  public newButton: boolean = false;

  constructor(
    private router: Router,
    private alert: AlertService,
    private api: ApiService,
    public feature: Feature,
    public user: User,
  ) { }

  ngOnInit() {
    // if the design already has an ID then it's not new.
    this.newDesign = this.feature.id ? false : true;
  }

  newButtonClick() {
    this.newButton = true;
  }

  saveFeature() {
    if(this.newDesign || this.newButton) {
      this.saveNew();
    }else{
      this.api.updateDesign().subscribe(feature => {
        // notify the user that we have saved their design
        this.alert.success("Successfully saved your design");
        // set the feature to what was returned from the API.
        this.feature = feature.ceiling;
        // navigate if the current path isn't already right
        var url = this.router.createUrlTree(['/design', this.feature.id]).toString();
        if(url != this.router.url) {
          this.router.navigate(['/design', this.feature.id]);
        }
      });
    }
  }

  saveNew() {
    // reset some values for the new quote
    this.feature.quoted = false;
    this.api.saveDesign().subscribe(feature => {
      // notify the user that we have saved their design
      this.alert.success("Successfully saved your design");
      // set the feature to what was returned from the API.
      this.feature = feature.ceiling;
      // redirect to the new design
      this.router.navigate(['/design', this.feature.id]);
    });
  }

}
