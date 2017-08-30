import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DebugService } from './../_services/debug.service';
import { ApiService } from './../_services/api.service';
import { OptionsComponent } from '../options/options.component';
import { LoadDesignComponent } from '../load-design/load-design.component';
import { SaveDesignComponent } from '../save-design/save-design.component';
import { LoginComponent } from '../login/login.component';
import { Feature } from '../feature';
import { User } from '../_models/user';

@Component({
  // selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  optionsDialogRef: MdDialogRef<any>;
  loadDesignDialogRef: MdDialogRef<any>;
  saveDesignDialogRef: MdDialogRef<any>;
  loginDialogRef: MdDialogRef<any>;
  position = 'above';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature,
    public dialog: MdDialog,
    public user: User
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.debug.log('design-component', 'id is set so we are loading a design');
        this.api.loadDesign(params['id']).subscribe(design => {
          this.debug.log('design-component', 'loaded design ID: ' + params['id']);
          this.debug.log('design-component', design);
          this.feature.setDesign(design);
          this.debug.log('design-component', this.feature);
        });
      }else{
        setTimeout(() => {
          this.feature.feature_type = params['type'];
          this.editOptions();
        }, 500);
      }
    });

    // subscribe to the saved event to close the save dialog
    this.api.onSaved.subscribe(success => {
      this.saveDesignDialogRef? this.saveDesignDialogRef.close() : null;
    });

    // subscribe to the loaded event to close the load dialog
    this.api.onLoaded.subscribe(success => {
      this.loadDesignDialogRef? this.loadDesignDialogRef.close() : null;
      this.optionsDialogRef? this.optionsDialogRef.close() : null;
    });

    // subscribe to the loggedIn event and set the user attributes
    // and close the dialog
    this.api.onUserLoggedIn.subscribe(data => {
      this.user.uid = data.uid;
      this.user.email = data.email;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;

      this.loginDialogRef.close();
    });
  }

  // ngAfterViewInit() {
  //   this.debug.log('design-component', 'afterViewInit');
  //   if(this.feature.width == 0 || this.feature.length == 0) {
  //     // this.editOptions();
  //   }
  // }

  public editOptions() {
    // load a dialog to edit the options
    var config = new MdDialogConfig();
    config.disableClose = true;
    this.optionsDialogRef = this.dialog.open(OptionsComponent, config);
    this.optionsDialogRef.afterClosed().subscribe(result => {
      this.debug.log('design-component', 'result is: ' + result);
      this.feature.buildGrid();
    });
  }

  public loadDesigns() {
    // If the user is not logged in then present the login dialog
    let loadDialog: MdDialog;
    this.api.getMyDesigns().subscribe(designs => {
      this.loadDesignDialogRef = this.dialog.open(LoadDesignComponent, new MdDialogConfig);
      this.loadDesignDialogRef.componentInstance.designs = designs;
    });
    if(!this.user.isLoggedIn()) {
      this.loginDialog();
    }
  }

  public saveDesign() {
    let saveDialog: MdDialog;
    this.saveDesignDialogRef = this.dialog.open(SaveDesignComponent, new MdDialogConfig);
    if (!this.user.isLoggedIn()) {
      this.loginDialog();
    }
  }

  public loginDialog() {
    this.debug.log('design-component', 'displaying login dialog');
    var config = new MdDialogConfig();
    config.disableClose = true;
    this.loginDialogRef = this.dialog.open(LoginComponent, config);
    this.loginDialogRef.afterClosed().subscribe(result => {
      if(result == 'cancel') {
        // we need to close the savedDialog too.
        this.saveDesignDialogRef.close();
      }
    });
  }

  public logout() {
    this.api.logout();
    this.user = new User;
  }

}
