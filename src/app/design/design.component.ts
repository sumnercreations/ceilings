import { MaterialsService } from 'app/_services/materials.service';
import { SeeyondService } from './../_services/seeyond.service';
import { SeeyondFeature } from './../seeyond-feature';
import { Location } from '@angular/common';
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
  syd_v = require('syd-visualization');
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
  tryingRequestQuote = false;

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
    public alert: AlertService,
    public location: Location,
    public materialsService: MaterialsService
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
    this.route.params.subscribe(params => {
      // default the feature type
      let featureType;
      if (params['type']) {
        featureType = this.feature.feature_type = this.feature.setFeatureType(params['type']);
        if (featureType === 'hush') { this.location.go(this.router.url.replace(/hush\/design/g, 'hush-blocks/design')); }
      }
      if (featureType === 'seeyond') { this.setSeeyondFeature(params); return; }
      // if one of the params are an integer we need to load the design
      const designId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
      if (!!designId) { // if designId is truthy
        this.api.loadDesign(designId).subscribe(design => {
          if (design == null) {
            this.debug.log('design-component', 'design not found');
            // design not found redirect to the design url
            this.router.navigate([params['type'], 'design']);
          } else {
            // design was found so load it.
            if (design.feature_type === params['type']) {
              design.feature_type = (design.feature_type === 'hush-blocks') ? 'hush' : design.feature_type;
              this.debug.log('design-component', 'setting the design.');
              design.feature_type = this.feature.setFeatureType(design.feature_type);
              this.feature.setDesign(design);
              this.featureTiles = this.feature.tilesArray[featureType];
              this.materials = this.getFeatureMaterials();
              if (this.feature.feature_type === 'clario') {
                this.feature.selectedTile = this.feature.tile_size.toString();
              }else if (this.feature.feature_type === 'velo') {
                // velo defaults
                this.feature.selectedTile = 'concave';
                this.feature.material = 'milky-white';
                this.feature.materialHex = '#dfdee0';
                this.feature.materialType = 'felt';
              }else if (this.feature.feature_type === 'hush') {
                this.feature.selectedTile = '00';
                this.feature.toolsArray = ['remove'];
              }
            } else {
              this.router.navigate([design.feature_type, 'design', design.id]);
            }
          }
        });
      } else {
        setTimeout(() => {
          this.feature.feature_type = this.feature.setFeatureType(params['type']);
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
            this.setSeeyondFeature(params);
          }else if (this.feature.feature_type === 'clario') {
            this.feature.selectedTile = this.feature.tile_size.toString();
            this.feature.material = 'zinc';
          }else if (this.feature.feature_type === 'velo') {
            this.feature.selectedTile = 'concave';
            this.feature.material = 'milky-white';
            this.feature.materialHex = '#dfdee0';
            this.feature.materialType = 'felt';
          }
          this.materials = this.getFeatureMaterials();
          this.debug.log('design-component', this.materials);
          this.debug.log('design-component', this.feature);
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
      // .takeUntil(this.ngUnsubscribe)
      .subscribe(success => {
      this.debug.log('design-component', 'loading design event subscription');
      this.loadDesigns();
    });

    // subscribe to the loaded event to close the load dialog
    this.api.onLoaded
      // .takeUntil(this.ngUnsubscribe)
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
    if (this.feature.feature_type === 'seeyond') { this.loadSeeyondDesigns(); return; }
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

  public loadSeeyondDesigns() {
    // If the user is not logged in then present the login dialog
    if (!this.user.isLoggedIn()) {
      this.loginDialog(true);
    } else {
      // let loadDialog: MdDialog;
      this.seeyondService.getMyFeatures()
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
          this.tryingRequestQuote = false;
          // we need to close the savedDialog too if it's open.
          if (this.saveDesignDialogRef) { this.saveDesignDialogRef.close(); return; }
        } else if (load) {
          // the user should be logged in now, so show the load dialog
          this.loadDesigns();
        }
        if (this.tryingRequestQuote) {
          this.tryingRequestQuote = false;
          this.requestQuote()
        }
      });
  }

  viewDetails () {
    let path = window.location.pathname;
    path = `${path}/details`
    this.router.navigate([path])
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
    if (!this.user.isLoggedIn()) {
      this.tryingRequestQuote = true;
      this.loginDialog();
      return;
    }
    // get the grid with guides
    // make sure the guide is set to true
    this.feature.showGuide = true;
    if (this.feature.feature_type === 'velo') {
      const veloCanvas = document.querySelector('canvas');
      const dataURL = veloCanvas.toDataURL();
      this.feature.design_data_url = dataURL;
    } else if (this.feature.feature_type === 'seeyond') {
      this.seeyond.seeyondProfileImage();
    } else {
      this.downloadGridGuide();
    }
    // load the dialog to confirm the design we will be sending
    const config = new MdDialogConfig();
    // config.height = '700px';
    const dialogRef = this.dialog.open(QuoteDialogComponent, config);
  }

  getFeatureMaterials() {
    const featureType = this.feature.feature_type;
    let requiredMaterials: any;
    switch (featureType) {
      case 'hush': requiredMaterials = this.feature.materials.felt.sola; break;
      case 'seeyond': requiredMaterials = this.feature.materials.felt.sola; break;
      case 'tetria': requiredMaterials = this.feature.materials.felt.merino; break;
      case 'clario': requiredMaterials = this.feature.materials.felt.sola; break;
      case 'velo':
        requiredMaterials = {felt: undefined, varia: undefined};
        requiredMaterials.felt = this.feature.materials.felt.merino;
        requiredMaterials.varia = this.feature.materials.varia;
      break;
    }
    return requiredMaterials;
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

  setSeeyondFeature(urlParams) {
    this.seeyondService.getPrices().subscribe(prices => {
      this.seeyond.prices = prices;
      this.api.getPartsSubstitutes().subscribe(partsSubs => {
        this.materialsService.parts_substitutes = partsSubs;
        const params = Object.assign({}, urlParams);
        const designId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
        if (!!designId) {   // load requested id
          this.seeyondService.loadFeature(designId).subscribe(design => {
            this.location.go(`seeyond/design/${design.name}/${design.id}`);
            this.seeyond.loadSeeyondDesign(design);
          });
        } else {
          // Set default param to wall if not specified
          if ((params['type'] === 'seeyond') && !(params['param1'] || params['param2'])) { params['param1'] = 'wall'; }

          // Determine the seeyond feature to load
          let seeyondFeature;
          const seeyondFeaturesList = this.seeyond.seeyond_features;
          Object.keys(seeyondFeaturesList).forEach(key => {
            if (Object.keys(params).map(feature => params[feature]).indexOf(seeyondFeaturesList[key]['name']) > -1) {
              seeyondFeature = seeyondFeaturesList[key]['name'];
            }
          })
          this.materials = this.getFeatureMaterials();
          this.featureTiles = this.feature.tilesArray[this.feature.feature_type];
          this.editOptions();
          this.seeyond.updateSeeyondFeature(seeyondFeature);
        }
      });
    });
  }
}
