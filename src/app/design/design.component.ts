import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DebugService } from './../_services/debug.service';
import { ApiService } from './../_services/api.service';
import { OptionsComponent } from '../options/options.component';
import { LoadDesignComponent } from '../load-design/load-design.component';
import { SaveDesignComponent } from '../save-design/save-design.component';
import { LoginComponent } from '../login/login.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import { TileUsageComponent } from '../tile-usage/tile-usage.component';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';
import { Feature } from '../feature';
import { User } from '../_models/user';
import * as FileSaver from 'file-saver';
import * as html2canvas from 'html2canvas';

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
  view3dDialogRef: MdDialogRef<any>;
  tileUsageDialogRef: MdDialogRef<any>;
  position = 'above';
  FileSaver = FileSaver;

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
        this.api.loadDesign(params['id']).subscribe(design => {
          if(design == null) {
            // design not found redirect to the design url
            this.router.navigate([params['type'], 'design']);
          }else{
            // design was found so load it.
            if(design.feature_type === params['type']) {
              this.feature.setDesign(design);
              if(this.feature.feature_type == 'clario') {
                this.feature.selectedTile = this.feature.tile_size.toString();
              }else if(this.feature.feature_type == 'velo') {
                // velo defaults
              }
            }else{
              this.router.navigate([design.feature_type, 'design', design.id]);
            }
          }
        });
      }else{
        setTimeout(() => {
          this.feature.feature_type = params['type'];
          // set the default values for tile and material
          if (this.feature.feature_type == 'tetria') {
            this.feature.selectedTile = '01';
            this.feature.material = 'milky-white';
          }else if(this.feature.feature_type == 'clario') {
            this.feature.selectedTile = this.feature.tile_size.toString();
            this.feature.material = 'zinc';
          }else if(this.feature.feature_type == 'velo') {
            this.feature.selectedTile = 'concave';
            this.feature.material = 'milky-white';
            this.feature.materialHex = '#dfdee0';
          }
          this.editOptions();
        }, 500);
      }
    });

    // subscribe to the saved event to close the save dialog
    this.api.onSaved.subscribe(success => {
      this.saveDesignDialogRef? this.saveDesignDialogRef.close() : null;
    });

    // subscribe to the loadDesigns event to handle it all here.
    // this will come from the options component
    this.feature.onLoadDesigns.subscribe(success => {
      this.debug.log('design-component', 'loading design event subscription');
      this.loadDesigns();
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

    // subscribe to the onView3d event and build the dialog
    this.feature.onView3d.subscribe( result => {
      this.debug.log('design-component', 'view 3d event');
      this.view3d();
    });
  }

  public editOptions() {
    // load a dialog to edit the options
    let config = new MdDialogConfig();
    config.disableClose = true;
    config.height = "700px";
    this.optionsDialogRef = this.dialog.open(OptionsComponent, config);
    this.optionsDialogRef.afterClosed().subscribe(result => {
      this.feature.buildGrid();
    });
  }

  public loadDesigns() {
    // If the user is not logged in then present the login dialog
    if(!this.user.isLoggedIn()) {
      this.loginDialog(true);
    }else{
      let loadDialog: MdDialog;
      this.api.getMyDesigns().subscribe(designs => {
        this.loadDesignDialogRef = this.dialog.open(LoadDesignComponent, new MdDialogConfig);
        this.loadDesignDialogRef.componentInstance.designs = designs;
      });
    }
  }

  public saveDesign() {
    let saveDialog: MdDialog;
    this.saveDesignDialogRef = this.dialog.open(SaveDesignComponent, new MdDialogConfig);
    if (!this.user.isLoggedIn()) {
      this.loginDialog();
    }
  }

  public loginDialog(load: boolean = false) {
    this.debug.log('design-component', 'displaying login dialog');
    let config = new MdDialogConfig();
    config.disableClose = true;
    this.loginDialogRef = this.dialog.open(LoginComponent, config);
    this.loginDialogRef.afterClosed().subscribe(result => {
      if(result == 'cancel') {
        // we need to close the savedDialog too if it's open.
        this.saveDesignDialogRef? this.saveDesignDialogRef.close() : null;
      }else if(load) {
        // the user should be logged in now, so show the load dialog
        this.loadDesigns();
      }
    });
  }

  public logout() {
    this.api.logout();
    this.user = new User;
  }

  public view3d() {
    this.debug.log('design-component', 'displaying 3d dialog');
    // display the dialog where the 3d visualization will be rendered
    this.view3dDialogRef = this.dialog.open(VisualizationComponent, new MdDialogConfig);
  }

  public tileUsage() {
    let config = new MdDialogConfig();
    config.height = '700px';
    this.tileUsageDialogRef = this.dialog.open(TileUsageComponent, config);
  }

  public downloadGridGuide() {
    this.debug.log('design-component', 'generating grid guide');
    let _this = this;
    html2canvas(document.getElementById("grid"), {
      onrendered: function(canvas) {
        let theCanvas = canvas;
        let dataURL = theCanvas.toDataURL();
        _this.debug.log('design-guide-data-url', dataURL);
        _this.feature.design_data_url = dataURL;
      }
    });
  }

  public requestQuote() {
    // get the grid with guides
    // make sure the guide is set to true
    this.feature.showGuide = true;
    this.downloadGridGuide();
    // load the dialog to confirm the design we will be sending
    let config = new MdDialogConfig();
    // config.height = '700px';
    let dialogRef = this.dialog.open(QuoteDialogComponent, config);
  }

}
