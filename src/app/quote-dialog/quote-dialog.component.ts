import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { DebugService } from './../_services/debug.service';
import { ApiService } from './../_services/api.service';
import { AlertService } from './../_services/alert.service';
import { Feature } from '../feature';
import { User } from '../_models/user';

@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent implements OnInit {
  public tilesArray: any;

  constructor(
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    private alert: AlertService,
    public feature: Feature,
    public dialog: MdDialog,
    public user: User,
    public dialogRef: MdDialogRef<QuoteDialogComponent>
  ) { }

  ngOnInit() {
    this.debug.log('quote-dialog', 'init quote-dialog');
    this.tilesArray = this.feature.getTilesPurchasedArray();
  }

  public quoteConfirmed() {
    // mark the design as quoted and save
    if(this.feature.id) {
      this.feature.quoted = true;
      this.api.updateDesign().subscribe(feature => {
        // send ceilings design email after we have saved.
        this.api.sendEmail().subscribe(response => {
          this.debug.log('quote-dialog', response);
        });
        // navigate if the current path isn't already right
        var url = this.router.createUrlTree([this.feature.feature_type + '/design', this.feature.id]).toString();
        if(url != this.router.url) {
          this.router.navigate([this.feature.feature_type + '/design', this.feature.id]);
        }
        this.alert.success("Your quote request has been sent.");
      });
    } else {
      // set the design name to something simple
      this.feature.design_name = this.feature.feature_type + ' - ' +  this.getToday();
      this.feature.quoted = true;
      this.api.saveDesign().subscribe(feature => {
        // send ceilings design email after we have saved.
        // set the feature to what was returned.
        this.feature.id = feature.ceiling.id;
        this.feature = feature.ceiling;
        this.api.sendEmail().subscribe(response => {
          this.debug.log('quote-dialog', response);
        });
        // redirect to the URL of the saved design.
        this.alert.success("We saved your design so we can quote it and you can load it later.");
        this.router.navigate([this.feature.feature_type + '/design', this.feature.id]);
      });
    }
  }

  private getToday() {
    var today = new Date();
    var todayString: string;
    var dd: any = today.getDate();
    var mm: any = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    todayString = mm+'/'+dd+'/'+yyyy;
    return todayString;
  }

}
