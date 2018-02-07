import { SeeyondService } from './../_services/seeyond.service';
import { SeeyondFeature } from './../seeyond-feature';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { VeloTileUsageComponent } from '../velo-tile-usage/velo-tile-usage.component';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as FileSaver from 'file-saver';
import * as html2canvas from 'html2canvas';
import { AlertService } from 'app/_services/alert.service';

@Component({
  // selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject();
  optionsDialogRef: MdDialogRef<any>;
  loadDesignDialogRef: MdDialogRef<any>;
  saveDesignDialogRef: MdDialogRef<any>;
  loginDialogRef: MdDialogRef<any>;
  view3dDialogRef: MdDialogRef<any>;
  tileUsageDialogRef: MdDialogRef<any>;
  position = 'above';
  FileSaver = FileSaver;
  featureTiles: any;
  materials: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public debug: DebugService,
    public api: ApiService,
    public feature: Feature,
    public dialog: MdDialog,
    public user: User,
    public seeyond: SeeyondFeature,
    public seeyondService: SeeyondService,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
    this.route.params.subscribe(params => {
      console.log('design onInit params', params);
      // default the feature type
      if (params['type']) {
        this.feature.feature_type = params['type'];
      }
      this.setSeeyondFeatureType(params);
      // if one of the params are an integer we need to load the design
      const designId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
      if (!!designId) {
        this.api.loadDesign(designId).subscribe(design => {
          if (design == null) {
            this.debug.log('design-component', 'design not found');
            // design not found redirect to the design url
            this.router.navigate([params['type'], 'design']);
          } else {
            // design was found so load it.
            if (design.feature_type === params['type']) {
              design.feature_type = (design.feature_type === 'hush-block') ? 'hush' : design.feature_type;
              this.debug.log('design-component', 'setting the design.');
              this.feature.setDesign(design);
              this.featureTiles = this.feature.tilesArray[this.feature.feature_type];
              this.materials = this.feature.newMaterialsArray[this.feature.feature_type];
              if (this.feature.feature_type === 'clario') {
                this.feature.selectedTile = this.feature.tile_size.toString();
              }else if (this.feature.feature_type === 'velo') {
                // velo defaults
                this.feature.selectedTile = 'concave';
                this.feature.material = 'milky-white';
                this.feature.materialHex = '#dfdee0';
                this.feature.materialType = 'felt';
              }else if (this.feature.feature_type === 'hush') {
                this.feature.toolsArray = ['remove'];
              }
            } else {
              this.router.navigate([design.feature_type, 'design', design.id]);
            }
          }
        });
      } else {
        setTimeout(() => {
          this.feature.feature_type = params['type'] === 'hush-block' ? 'hush' : params['type'];
          // set the default values for tile and material
          this.debug.log('design-component', `feature_type: ${this.feature.feature_type}`);
          if (this.feature.feature_type === 'tetria') {
            this.feature.selectedTile = '01';
            this.feature.material = 'milky-white';
          }else if (this.feature.feature_type === 'hush') {
            this.feature.selectedTile = '00';
            this.feature.material = 'zinc';
            this.feature.toolsArray = ['remove'];
          }else if (this.feature.feature_type === 'seeyond') {
            this.seeyond.updateFeature('unknown'); // TODO, static for now
          }else if (this.feature.feature_type === 'clario') {
            this.feature.selectedTile = this.feature.tile_size.toString();
            this.feature.material = 'zinc';
          }else if (this.feature.feature_type === 'velo') {
            this.feature.selectedTile = 'concave';
            this.feature.material = 'milky-white';
            this.feature.materialHex = '#dfdee0';
            this.feature.materialType = 'felt';
          }
          this.materials = this.feature.newMaterialsArray[this.feature.feature_type];
          this.featureTiles = this.feature.tilesArray[this.feature.feature_type];
          this.editOptions();
        }, 500);
      }
    });

    // subscribe to the saved event to close the save dialog
    this.api.onSaved
      .takeUntil(this.ngUnsubscribe)
      .subscribe(success => {
        if (this.saveDesignDialogRef) { this.saveDesignDialogRef.close(); }
    });

    // subscribe to the loadDesigns event to handle it all here.
    // this will come from the options component
    this.feature.onLoadDesigns
      .takeUntil(this.ngUnsubscribe)
      .subscribe(success => {
      this.debug.log('design-component', 'loading design event subscription');
      this.loadDesigns();
    });

    // subscribe to the loaded event to close the load dialog
    this.api.onLoaded
      .takeUntil(this.ngUnsubscribe)
      .subscribe(success => {
        if (this.loadDesignDialogRef) { this.loadDesignDialogRef.close(); }
        if (this.optionsDialogRef) { this.optionsDialogRef.close(); }
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
    this.feature.onView3d
      .takeUntil(this.ngUnsubscribe)
      .subscribe( result => {
      this.debug.log('design-component', 'view 3d event');
      this.view3d();
    });

  }  // end ngOnInit()

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public editOptions() {
    // load a dialog to edit the options
    const config = new MdDialogConfig();
    config.disableClose = true;
    config.height = '90%';
    config.width = '80%';
    this.optionsDialogRef = this.dialog.open(OptionsComponent, config);
    this.optionsDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
      this.feature.buildGrid();
    });
  }

  public loadDesigns() {
    // If the user is not logged in then present the login dialog
    if (!this.user.isLoggedIn()) {
      this.loginDialog(true);
    } else {
      // let loadDialog: MdDialog;
      this.api.getMyDesigns()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(designs => {
        this.loadDesignDialogRef = this.dialog.open(LoadDesignComponent, new MdDialogConfig);
        this.loadDesignDialogRef.componentInstance.designs = designs;
      });
    }
  }

  public saveDesign() {
    // let saveDialog: MdDialog;
    this.saveDesignDialogRef = this.dialog.open(SaveDesignComponent, new MdDialogConfig);
    if (!this.user.isLoggedIn()) {
      this.loginDialog();
    }
  }

  public loginDialog(load: boolean = false) {
    this.debug.log('design-component', 'displaying login dialog');
    const config = new MdDialogConfig();
    config.disableClose = true;
    this.loginDialogRef = this.dialog.open(LoginComponent, config);
    this.loginDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result === 'cancel') {
        // we need to close the savedDialog too if it's open.
          if (this.saveDesignDialogRef) { this.saveDesignDialogRef.close() }
        }else if (load) {
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
    const config = new MdDialogConfig();
    config.height = '700px';
    if (this.feature.feature_type === 'velo') {
      this.tileUsageDialogRef = this.dialog.open(VeloTileUsageComponent, config);
    } else {
      this.tileUsageDialogRef = this.dialog.open(TileUsageComponent, config);
    }
  }

  public downloadGridGuide() {
    this.debug.log('design-component', 'generating grid guide');
    const _this = this;
    html2canvas(document.getElementById('grid'), {
      onrendered: function(canvas) {
        const theCanvas = canvas;
        const dataURL = theCanvas.toDataURL();
        _this.debug.log('design-guide-data-url', dataURL);
        _this.feature.design_data_url = dataURL;
      }
    });
  }

  public requestQuote() {
    // get the grid with guides
    // make sure the guide is set to true
    this.feature.showGuide = true;
    if (this.feature.feature_type === 'velo') {
      const veloCanvas = document.querySelector('canvas');
      const dataURL = veloCanvas.toDataURL();
      this.feature.design_data_url = dataURL;
    } else {
      this.downloadGridGuide();
    }
    // load the dialog to confirm the design we will be sending
    const config = new MdDialogConfig();
    // config.height = '700px';
    const dialogRef = this.dialog.open(QuoteDialogComponent, config);
  }

  adjustGridDimensions(tool) {
    switch (tool) {
      case 'addColumn': this.feature.width = this.feature.width + 24; break;
      case 'removeColumn': this.feature.width = this.feature.width - 24; break;
      case 'addRow': this.feature.length = this.feature.length + 24; break;
      case 'removeRow': this.feature.length = this.feature.length - 24; break;
      default: break;
    }
    this.feature.buildGrid();
  }

  setSeeyondFeatureType(params) {
    // If a seeyond feature is requested as a parameter then load that feature
    const seeyondFeatures = this.seeyond.seeyond_features;
    Object.keys(seeyondFeatures).forEach(key => {
      if (Object.keys(params).map(feature => feature[key]).indexOf(seeyondFeatures[key]['name']) > -1) {
        this.seeyond.updateFeature(seeyondFeatures[key]['name']);
      }
    })
  }
}
