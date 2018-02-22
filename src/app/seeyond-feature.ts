import { SeeyondService } from './_services/seeyond.service';
import { Injectable, EventEmitter } from '@angular/core';
import { DebugService } from './_services/debug.service';
import { Feature } from 'app/feature';
import * as _ from 'lodash';
import { MaterialsService } from 'app/_services/materials.service';

@Injectable()
export class SeeyondFeature extends Feature {
  onFeatureUpdated = new EventEmitter();
  onDimensionsChange = new EventEmitter();
  public syd_t = require('syd-tessellation');
  public syd_v = require('syd-visualization');
  public title: string;
  public name: string;
  public image: string;
  public height: number;
  public radius: number;
  public angle: number;
  public ceiling_length: number;
  public depth: number;
  public data: any = [];
  public xml: any = {};
  public tessellation = 0; // court
  public tessellationStr = 'court';
  public pattern_strength = 3;
  public material = 'zinc';
  public sheet_part_id = '0-51-804';
  public boxes: number;
  public sheets: number;
  public cove_lighting = false;
  public random_seed: number;
  public boxsize = 16; // baked in number right now.
  public prices: any;
  public hardware: any = [];
  public seeyond_feature_type: string;
  public seeyond_feature_index: number;
  public patterns = this.materialsService.seeyondPatternsArray;
  public seeyondService: SeeyondService;
  public widthMin: number;
  public widthMax: number;
  public heightMin: number;
  public heightMax: number;
  public ceilLengthMin: number;
  public ceilLengthMax: number;
  public radiusMin: number;
  public radiusMax: number;

  updateFeature(seeyond_feature_type: string) {
    if (seeyond_feature_type) {
      this.debug.log('seeyond', `updateFeature: ${this.seeyond_feature_type}`);
      switch (seeyond_feature_type) {
        case 'linear-partition': this.seeyond_feature_index = 0; break;
        case 'curved-partition': this.seeyond_feature_index = 1; break;
        case 'wall': this.seeyond_feature_index = 2; break;
        case 'wall-to-ceiling': this.seeyond_feature_index = 3; break;
        case 'ceiling': this.seeyond_feature_index = 4; break;
        default: {
          this.seeyond_feature_index = 2;
          this.seeyond_feature_type = 'wall';
        }; break;
      }
      this.seeyond_feature_type = seeyond_feature_type;
      this.location.go(`seeyond/design/${seeyond_feature_type}`);
      // load the selected feature
      const seeyondFeature = this.seeyond_features[this.seeyond_feature_index];

      // set defaults
      this.seeyond_feature_index = this.seeyond_feature_index;
      this.name = seeyondFeature.name;
      this.title = seeyondFeature.title;
      this.image = seeyondFeature.image;
      this.width = seeyondFeature.width;
      this.height = seeyondFeature.height;
      this.radius = seeyondFeature.radius;
      this.angle = seeyondFeature.angle;
      this.ceiling_length = seeyondFeature.ceiling_length;
      this.setMaxMinDimensions();

      this.reloadVisualization();
    }
  }

  loadSeeyondFeature(feature) {
    this.id = feature.id;
    this.uid = feature.uid;
    this.seeyond_feature_index = feature.feature_type;
    this.seeyond_feature_type = feature.name;
    this.title = feature.title;
    this.name = feature.name;
    this.design_name = feature.design_name;
    this.project_name = feature.project_name;
    this.specifier = feature.specifier;
    this.units = feature.units;
    this.width = feature.width;
    this.height = feature.height;
    this.radius = feature.radius;
    this.angle = feature.angle;
    this.ceiling_length = feature.ceiling_length;
    this.depth = feature.depth;
    this.tessellation = feature.tessellation;
    this.tessellationStr = this.getTessellationName(feature.tessellation)
    this.pattern_strength = feature.pattern_strength;
    this.material = feature.material;
    this.sheet_part_id = feature.sheet_part_id;
    this.boxes = feature.boxes;
    this.sheets = feature.sheets;
    this.xml = feature.xml;
    this.cove_lighting = feature.cove_lighting;
    this.random_seed = feature.random_seed;
    this.services_amount = feature.services_amount;
    this.estimated_amount = feature.estimated_amount;
    this.quoted = feature.quoted;
    this.archived = feature.archived;
    this.image = this.getFeatureImage(this.seeyond_feature_index); // need to get this from the seeyond_feature_index

    this.reloadVisualization();
  }

  reloadVisualization() {
    // We need to set the random_seed before UpdateFeature()
    if (this.random_seed !== undefined) {
      this.debug.log('seeyond', 'RANDOM SEED IS SET.');
      this.debug.log('seeyond', `Current Random seed: ${this.random_seed}`);
      this.syd_t.QT.SetRandomSeedValue(this.random_seed);
    }// else{
    //   this.random_seed = this.syd_t.QT.GetRandomSeedValue();
    // }

    const jsonProperties = this.getJsonProperties();

    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));
    this.syd_t.QT.UpdateFeature();

    // Set the random_seed if it's not already set
    if (this.random_seed === undefined) {
      this.debug.log('seeyond', 'RANDOM SEED IS NOT SET');
      this.random_seed = this.syd_t.QT.GetRandomSeedValue();
      this.debug.log('seeyond', `Current Random seed: ${this.random_seed}`);
    }

    const front = this.syd_t.QT.GetFrontSurfacePoints();
    const back = this.syd_t.QT.GetBackSurfacePoints();
    const uNum = this.syd_t.QT.GetU();
    const vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.SetFeatureType(this.seeyond_feature_index);
    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));

    // update the feature depth
    this.depth = this.syd_v.QT.Visualization.GetFeatureDepth().toFixed(2);

    // feature has been updated
    this.onFeatureUpdated.emit();
    this.onDimensionsChange.emit();

    // update the XML
    this.xml = this.getXML();
  }

  redrawVisualization() {
    const front = this.syd_t.QT.GetFrontSurfacePoints();
    const back = this.syd_t.QT.GetBackSurfacePoints();
    const uNum = this.syd_t.QT.GetU();
    const vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));

    // feature has been updated
    this.onFeatureUpdated.emit();

    // update the XML
    this.xml = this.getXML();
  }

  downloadImages() {
    let profile = this.syd_v.QT.Visualization.TakeSnapshot(45);
    let facing  = this.syd_v.QT.Visualization.TakeSnapshot(0);
    const filename = this.name + '.zip';
    const FileSaver = require('file-saver');
    const JSZip = require('jszip');
    const zip = new JSZip();

    profile = profile.replace(/^data:image\/(png|jpg);base64,/, '');
    facing = facing.replace(/^data:image\/(png|jpg);base64,/, '');
    zip.file('profile.png', profile, {base64: true});
    zip.file('facing.png', facing, {base64: true});
    zip.generateAsync({type: 'blob'})
    .then(function (blob) {
        FileSaver.saveAs(blob, filename);
    });
  }

  updateEstimatedAmount() {
    if (!this.prices) {
      this.seeyondService.getPrices().subscribe(response => {
        this.prices = response;
        this.updateEstimatedAmount();
      });
    }
    const sheetCost = this.prices['felt_sheet'];
    const stapleCost: number = this.prices['staple'];
    const ziptieCost: number = this.prices['ziptie'];
    const magnetCost: number = this.prices['magnet'];
    const backplateCost: number = this.prices['backplate'];
    const baseplateCost: number = this.prices['baseplate'];
    const frameCost: number = this.prices['frame'];

    const columns = this.syd_t.QT.GetU();
    const rows = this.syd_t.QT.GetV();
    if (this.seeyond_feature_index === 0 || this.seeyond_feature_index === 1) {
      // double sheet and boxes
      this.sheets = this.syd_t.QT.GetSheets() * 2;
      this.boxes = this.syd_t.QT.GetParts() * 2;
    } else {
      this.sheets = this.syd_t.QT.GetSheets();
      this.boxes = this.syd_t.QT.GetParts();
    }

    // PRODUCTS
    const totalProductsCost = this.sheets * sheetCost;

    // HARDWARE
    const totalHardwareCost = this.getHardwareCost(this.seeyond_feature_index);

    // SERVICES
    const staples: number = this.getStaples(this.seeyond_feature_index);
    // var zipties: number = this.getZipties(this.seeyond_feature_index);
    const magnets: number = this.syd_t.QT.GetMagnets();
    const frames: number = this.getFrames(this.seeyond_feature_index);
    const backplates: number = this.getBackplates(this.seeyond_feature_index);
    const baseplates: number = this.getBaseplates(this.seeyond_feature_index);
    const fabricationCost: number = this.getFabricationCost(this.seeyond_feature_index);

    this.services_amount = (staples * stapleCost) + (magnets * magnetCost) + (backplates * backplateCost) + (baseplates * baseplateCost) + (frames * frameCost) + fabricationCost;

    // this.debug.log('seeyond', `Rows: ${rows}`);
    // this.debug.log('seeyond', `Columns: ${columns}`);
    // this.debug.log('seeyond', `boxes: ${this.boxes}`);
    // this.debug.log('seeyond', `sheets: ${this.sheets}`);
    // this.debug.log('seeyond', `magnets: ${magnets}`);
    // this.debug.log('seeyond', `stapleCost: ${stapleCost}`);
    // this.debug.log('seeyond', `Staples cost: ${(staples * stapleCost)}`);
    // // this.debug.log('seeyond', `Zipties cost: ${(zipties * ziptieCost)}`);
    // this.debug.log('seeyond', `Magnets cost: ${(magnets * magnetCost)}`);
    // this.debug.log('seeyond', `Backplates: ${backplates}`);
    // this.debug.log('seeyond', `Backplates cost: ${(backplates * backplateCost)}`);
    // this.debug.log('seeyond', `Baseplates: ${baseplates}`);
    // this.debug.log('seeyond', `Baseplates cost: ${(baseplates * baseplateCost)}`);
    // this.debug.log('seeyond', `Frames: ${frames}`);
    // this.debug.log('seeyond', `Frames cost: ${(frames * frameCost)}`);
    // this.debug.log('seeyond', `Fabrication cost: ${fabricationCost}`);
    // this.debug.log('seeyond', `Products cost: ${totalProductsCost}`);
    // this.debug.log('seeyond', `Hardware cost: ${totalHardwareCost}`);
    // this.debug.log('seeyond', `Services cost: ${this.services_amount}`);

    this.estimated_amount = totalProductsCost + totalHardwareCost + this.services_amount;
    this.debug.log('seeyond', `estimated amount: ${this.estimated_amount}`);
    return this.estimated_amount;
  }

  convertDimensionsUnits(newUnit) {
    this.units = newUnit;
    if (this.units === 'inches') {
      this.height = this.convertCMtoIN(this.height);
      this.width = this.convertCMtoIN(this.width);
      this.ceiling_length = this.convertCMtoIN(this.ceiling_length);
      this.radius = this.convertCMtoIN(this.radius);
    }
    if (this.units === 'centimeters') {
      this.height = this.convertINtoCM(this.height);
      this.width = this.convertINtoCM(this.width);
      this.ceiling_length = this.convertINtoCM(this.ceiling_length);
      this.radius = this.convertINtoCM(this.radius);
    }
  }

  setMaxMinDimensions(units?) {
    if (!units) { units = 'inches'; } // if units aren't given, assume inches
    this.widthMin = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['widthMin'];
    this.widthMax = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['widthMax'];
    this.heightMin = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['heightMin'];
    this.heightMax = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['heightMax'];
    this.ceilLengthMin = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['ceilLengthMin'];
    this.ceilLengthMax = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['ceilLengthMax'];
    this.radiusMin = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['radiusMin'];
    this.radiusMax = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units]['radiusMax'];

    if (this.width) { // update radiusMin based off entered width
      const newRadiusMin = Math.ceil((this.width * .5) + 1);
      this.radiusMin = (newRadiusMin < this.radiusMin) ? this.radiusMin : newRadiusMin;
    }
  }

  public updateDimensions() {
    const currentWidth = this.width;
    const currentHeight = this.height;
    const currentCeilLength = this.ceiling_length;
    const currentRadius = this.radius;
    const units = this.units;
    const max_min = this.materialsService.seeyondMinMaxDimensions[this.seeyond_feature_index][units];
    const widthMin = max_min['widthMin'];
    const widthMax = max_min['widthMax'];
    const heightMin = max_min['heightMin'];
    const heightMax = max_min['heightMax'];
    const ceilLengthMin = max_min['ceilLengthMin'];
    const ceilLengthMax = max_min['ceilLengthMax'];
    let radiusMin = max_min['radiusMin'];
    const radiusMax = max_min['radiusMax'];
    if (this.width) { // update radiusMin based off entered width
      const newRadiusMin = Math.ceil((this.width * .5) + 1);
      radiusMin = (newRadiusMin < this.radiusMin) ? this.radiusMin : newRadiusMin;
    }

    if (currentWidth < widthMin) {
      this.width = widthMin;
      this.alert.error(`The minimum width is ${widthMin} ${units}`);
    }
    if (currentWidth > widthMax) {
      this.width = widthMax;
      this.alert.error(`The maximum width is ${widthMax} ${units}`);
    }
    if (currentHeight < heightMin) {
      this.height = heightMin;
      this.alert.error(`The minimum height is ${heightMin} ${units}`);
    }
    if (currentHeight > heightMax) {
      this.height = heightMax;
      this.alert.error(`The maximum height is ${heightMax} ${units}`);
    }
    if ((currentCeilLength < ceilLengthMin) && (this.seeyond_feature_index === 4)) {
      this.ceiling_length = ceilLengthMin;
      this.alert.error(`The minimum ceilLength is ${ceilLengthMin} ${units}`);
    }
    if ((currentCeilLength > ceilLengthMax) && (this.seeyond_feature_index === 4)) {
      this.ceiling_length = ceilLengthMax;
      this.alert.error(`The maximum ceilLength is ${ceilLengthMax} ${units}`);
    }
    if ((currentRadius < radiusMin) && (this.seeyond_feature_index === 1)) {
      this.radius = radiusMin;
      this.alert.error(`The minimum radius for your width is ${radiusMin} ${units}`);
    }
    if ((currentRadius > radiusMax) && (this.seeyond_feature_index === 1)) {
      this.radius = radiusMax;
      this.alert.error(`The maximum radius is ${radiusMax} ${units}`);
    }
    this.onDimensionsChange.emit();
    this.reloadVisualization();
  }


  getFabricationCost(seeyond_feature_index: number) {
    const ceilingFab = 48.46;
    const partitionFab = 48.46;
    const wallFab = 44.13;
    let fabricationCost: number;

    switch (seeyond_feature_index) {
      case 0:
        // linear
        fabricationCost = this.boxes * partitionFab;
        break;

      case 1:
        fabricationCost = this.boxes * partitionFab;
        break;

      case 2:
        fabricationCost = this.boxes * wallFab;
        break;

      case 3:
        fabricationCost = (this.getWallBoxes() * wallFab) + (this.getCeilingBoxes() * ceilingFab);
        break;

      case 4:
        fabricationCost = this.boxes * ceilingFab;
        break;

      default:
        // shouldn't happen, but if it does default to the partition fab cost.
        fabricationCost = this.boxes * partitionFab;
        break;
    }

    return fabricationCost;
  }

  getWallBoxes() {
    const wallRows = this.syd_t.QT.GetWallRows();
    const wallCols = this.syd_t.QT.GetWallColumns();
    this.debug.log('seeyond', `wall rows: ${wallRows}`);
    this.debug.log('seeyond', `wall cols: ${wallCols}`);

    return wallRows * wallCols;
  }

  getCeilingBoxes() {
    const ceilingRows = this.syd_t.QT.GetCeilingRows();
    const ceilingCols = this.syd_t.QT.GetCeilingColumns();
    this.debug.log('seeyond', `ceiling rows: ${ceilingRows}`);
    this.debug.log('seeyond', `ceiling cols: ${ceilingCols}`);

    return ceilingRows * ceilingCols;
  }

  getBackplates(seeyond_feature_index: number) {
    if (seeyond_feature_index === 2) {
      // wall
      return Math.ceil(Math.ceil(this.boxes / 4) / 3);
    } else if (seeyond_feature_index === 3) {
      // wall-to-ceiling
      const wallRows = this.syd_t.QT.GetWallRows();
      const wallCols = this.syd_t.QT.GetWallColumns();
      return Math.ceil(Math.ceil((wallRows * wallCols) / 4) / 3);
    } else {
      // anything else
      return 0;
    }
  }

  getBaseplates(seeyond_feature_index: number) {
    if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
      // partitions
      return Math.ceil(this.syd_t.QT.GetU() / 3);
    } else {
      return 0;
    }
  }

  getStaples(seeyond_feature_index: number) {
    if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
      // partitions. we need to double the number of frames
      return this.boxes * 25 * 2;
    }else if (seeyond_feature_index === 2) {
      // wall
      return this.boxes * 25;
    }else if (seeyond_feature_index === 3) {
      // wall-to-ceiling
      return this.boxes * 25;
    }else if (seeyond_feature_index === 4) {
      // ceiling
      return this.boxes * 25;
    }else {
      // anything else
      return this.boxes * 25;
    }
  }

  getZipties(seeyond_feature_index: number) {
    if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
      // partitions
      return Math.ceil(this.boxes * 12);
    }else if (seeyond_feature_index === 2) {
      // wall
      return 0;
    }else if (seeyond_feature_index === 3) {
      // wall-to-ceiling only the ceiling needs ties
      const ceilingRows = this.syd_t.QT.GetCeilingRows();
      const ceilingCols = this.syd_t.QT.GetCeilingColumns();
      const ceilingBoxes = Math.ceil(ceilingRows * ceilingCols);
      return Math.ceil(ceilingBoxes * 24);
    }else if (seeyond_feature_index === 4) {
      // ceiling
      return Math.ceil(this.boxes * 24);
    }
  }

  getFrames(seeyond_feature_index: number) {
    if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
      // partitions. we need to double the number of frames
      return Math.ceil(this.boxes / 18) * 2;
    }else if (seeyond_feature_index === 2) {
      // wall
      return Math.ceil(this.boxes / 18);
    }else if (seeyond_feature_index === 3) {
      // wall-to-ceiling
      return Math.ceil(this.boxes / 18);
    }else if (seeyond_feature_index === 4) {
      // ceiling
      return Math.ceil(this.boxes / 18);
    }
  }

  getHardwareCost(seeyond_feature_index: number) {
    // reset hardware array
    this.hardware = [];
    let totalHardwareCost = 0.00;
    this.debug.log('seeyond', '========== FEATURE HARDWARE ===============')
    const hardwares = this.seeyond_features[seeyond_feature_index].hardware;
    const size = Object.keys(hardwares).length;
    let qty;
    for (const hardware in hardwares) {
      if (hardwares.hasOwnProperty(hardware)) {
        qty = this.getHardwareQty(seeyond_feature_index, hardware);
        const hardwareCost = this.prices[hardware] * qty;
        totalHardwareCost += hardwareCost;
        // this.debug.log('seeyond', hardware);
        // this.debug.log('seeyond', `PRICE: ${this.prices[hardware]}`);
        // this.debug.log('seeyond', `QUANTITY: ${qty}`);
        // this.debug.log('seeyond', `HARDWARE COST: ${hardwareCost}`);
        const hwpart = {
          'part_id': hardware,
          'qty': qty
        }
        this.hardware.push(hwpart);
      }
    }
    this.debug.log('seeyond', '========== /FEATURE HARDWARE ===============')
    return totalHardwareCost;
  }

  getHardwareQty(seeyond_feature_index: number, hardware: string) {
    let hardwareQty = 0;
    const columns = this.syd_t.QT.GetU();
    const rows = this.syd_t.QT.GetV();
    switch (hardware) {
      // WALL
      case '3-15-1606':
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;

      case '3-85-104':
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;

      case '3-85-109':
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;
      // END WALL

      // PARTITIONS
      case '3-85-106':
        hardwareQty = columns * 4;
        break;

      // Used in partitions and ceilings
      case '3-15-0842':
        if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
          hardwareQty = this.getBaseplates(seeyond_feature_index) * 3;
        }else if (seeyond_feature_index === 3) {
          hardwareQty = Math.ceil(this.syd_t.QT.GetCeilingRows() / 2) * Math.ceil(this.syd_t.QT.GetCeilingColumns() / 2) * 2;
        }else if (seeyond_feature_index === 4) {
          hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2) * 2;
        }
        break;

      // Used in partitions and ceilings
      case '3-85-105':
        if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
          hardwareQty = columns * 4;
        }else if (seeyond_feature_index === 3) {
          hardwareQty = Math.ceil(this.syd_t.QT.GetCeilingRows() / 2) * Math.ceil(this.syd_t.QT.GetCeilingColumns() / 2) * 4;
        }else if (seeyond_feature_index === 4) {
          hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2) * 4;
        }
        break;

      // Used in partitions and ceilings
      case '3-85-102':
        if (seeyond_feature_index === 0 || seeyond_feature_index === 1) {
          hardwareQty = Math.ceil(this.boxes * 12);
        }else if (seeyond_feature_index === 3) {
          const ceilingRows = this.syd_t.QT.GetCeilingRows();
          const ceilingCols = this.syd_t.QT.GetCeilingColumns();
          const ceilingBoxes = Math.ceil(ceilingRows * ceilingCols);
          hardwareQty = Math.ceil(ceilingBoxes * 24);
        }else if (seeyond_feature_index === 4) {
          hardwareQty = Math.ceil(this.boxes * 24);
        }
        break;

      // CEILINGS
      case '3-85-107':
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case '3-85-108':
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case '3-15-1674':
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case '3-15-1675':
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;
      // END CEILINGS

      default:
        alert('Unknown hardware part: ' + hardware);
        break;
    }
    return hardwareQty;
  }

  getMaterialImage(material: string) {
    return '/assets/images/materials/felt/sola/' + material + '.png';
  }

  getMaterialName(material: string) {
    return material.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getTessellationImage(tessellation: number) {
    return '/assets/images/patterns/' + this.getTessellationName(tessellation).toLowerCase() + '.png';
  }

  getTessellationName(tessellation: number) {
    let name: string;
    switch (tessellation) {
      case 0: name = 'court'; break;
      case 1: name = 'cusp'; break;
      case 2: name = 'kink'; break;
      case 3: name = 'tilt'; break;
      case 4: name = 'billow'; break;
      default: name = 'Pattern name not found for tessellation: ' + tessellation; break;
    }
    return name;
  }

  getTesslationNumber(tessName: string) {
    let tessNum: number;
    switch (tessName) {
      case 'court': tessNum = 0; break;
      case 'cusp': tessNum = 1; break;
      case 'kink': tessNum = 2; break;
      case 'tilt': tessNum = 3; break;
      case 'billow': tessNum = 4; break;
    }
    return tessNum;
  }

  getFormattedAmount() {
    const accounting = require( 'accounting' );
    return accounting.formatMoney(this.estimated_amount);
  }

  getFormattedServicesAmount() {
    const accounting = require( 'accounting' );
    return accounting.formatMoney(this.services_amount);
  }

  getFeatureImage(seeyond_feature_index: number) {
    return this.seeyond_features[seeyond_feature_index].image;
  }

  getDimensionString(units?) {
    let depth = this.depth;
    if (units) {
      depth = (this.units === 'inches') ? this.depth : this.convertINtoCM(this.depth);
      // if units come in update this.units
      this.units = units;
    }
    let dimensionString = `${this.width} W x ${this.height} H x ${depth} D`;
    // curved partition has radius
    if (this.seeyond_feature_index === 1) { dimensionString += ' x ' + this.radius + ' R'; }
    // wall to ceiling has ceiling_length
    if (this.seeyond_feature_index === 3) { dimensionString += ' x ' + this.ceiling_length + ' CL'; }
    // add dimensions
    if (this.units === 'inches') { dimensionString += ` (IN)`; }
    if (this.units === 'centimeters') { dimensionString += ` (CM)`; }

    return dimensionString;
  }

  getJsonProperties() {
    let convertedWidth = this.width;
    let convertedHeight = this.height;
    let convertedCeilingLength = this.ceiling_length;
    let convertedRadius = this.radius;
    if (this.units === 'centimeters') {
      convertedWidth = this.convertCMtoIN(convertedWidth);
      convertedHeight = this.convertCMtoIN(convertedHeight);
      convertedCeilingLength = this.convertCMtoIN(convertedCeilingLength);
      convertedRadius = this.convertCMtoIN(convertedRadius);
    }
    return {
      'UserInputs': {
        // 0 = straight partition, 1 = arc partition, 2 = facing, 3 = transition, 4 = ceiling, 5 = bent partition
        'Type': this.seeyond_feature_index,
        // 0 = court, 1 = cusp, 2 = kink, 3 = tilt, 4 = billow
        'Tessellation': this.tessellation,
        // valid values = .1 - 1.0 (we send whole numbers 1-10 and the tessellation divides by 10)
        'PatternStrength': this.pattern_strength,
        // relative path to rendering material image
        'Material': this.getMaterialImage(this.material),
        // in inches
        'Width': convertedWidth,
        // in inches
        'Height': convertedHeight,
        // in inches
        'Radius': convertedRadius,
        // in degrees 0-360
        'Angle':  this.angle,
        // in inches
        'Ceiling_Length': convertedCeilingLength
      }
    }
  }

  getXML() {
    const front = this.syd_t.QT.GetFrontSurfacePoints();
    const back = this.syd_t.QT.GetBackSurfacePoints();
    const uNum = this.syd_t.QT.GetU();
    const vNum = this.syd_t.QT.GetV();

    const properties = JSON.parse(this.syd_t.QT.GetAllPropertiesAsJSONString());
    this.debug.log('seeyond', properties);

    const takeOff = properties.Take_Off;
    let hemi = 'single';
    if (this.syd_t.QT.Two_Sided) {
      hemi = 'double';
    }

    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter(true);
    xw.formatting = 'indented'; // add indentation and newlines
    xw.indentChar = ' '; // indent with spaces
    xw.indentation = 2; // add 2 spaces per level
    xw.startDocument();
    xw.startElement('seeyondProject');

    xw.startElement('projectID');
    if (this.id) {
      xw.text(this.id);
    }else {
      xw.text('New Project');
    }
    xw.endElement('projectID');

    if (this.uid) {
      xw.startElement('user');
         xw.startElement('uid');
           xw.text(this.uid);
         xw.endElement('uid');
      xw.endElement('user');
    }

    xw.startElement('order');

      xw.startElement('orderDate');
      xw.text('2017-01-22'); // TO DO: insert order date here
      xw.endElement('orderDate');
      // TO DO: add the products price, hardware price and services price
      xw.startElement('price');
      xw.text(this.estimated_amount);
      xw.endElement('price');

      xw.startElement('notes');
      xw.text('Test comments here.'); // TO DO: insert notes here
      xw.endElement('notes');

    xw.endElement('order');

    xw.startElement('userInputs');

      let seeyond_feature_index = 'StraightPartition';
      switch (properties.UserInputs.Type) {
        // freestanding linear
        case 0:
          seeyond_feature_index = 'Freestanding Linear';
          break;

        // freestanding curved partition
        case 1:
          seeyond_feature_index = 'Freestanding Curved';
          break;

        // wall feature
        case 2:
          seeyond_feature_index = 'Wall';
          break;

        // wall-to-ceiling partition
        case 3:
          seeyond_feature_index = 'Wall-to-Ceiling';
          break;

        // ceiling feature
        case 4:
          seeyond_feature_index = 'Ceiling Feature';
          break;

        // wall
        default:
          seeyond_feature_index = 'Wall';
      }

      xw.startElement('installationType');
      xw.text(seeyond_feature_index);
      xw.endElement('installationType');

      let tessellation = 'quad';
      switch (properties.UserInputs.Tessellation) {
        case 1:
            tessellation = 'cusp';
            break;
        case 2:
            tessellation = 'kink';
            break;
        case 3:
            tessellation = 'tilt';
            break;
        case 4:
            tessellation = 'billow';
            break;
        default:
            tessellation = 'court';
      }

      xw.startElement('tessellation');
      xw.text(tessellation);
      xw.endElement('tessellation');

      xw.startElement('width');
      xw.text(properties.UserInputs.Width);
      xw.endElement('width');

      xw.startElement('height');
      xw.text(properties.UserInputs.Height);
      xw.endElement('height');

      if (seeyond_feature_index === 'Freestanding Curved') {
        xw.startElement('radius');
        xw.text(properties.UserInputs.Radius);
        xw.endElement('radius');
      }

      if (seeyond_feature_index === 'Wall-to-Ceiling') {
        xw.startElement('angle');
        xw.text(properties.UserInputs.Angle);
        xw.endElement('angle');

        xw.startElement('ceiling_length');
        xw.text(properties.UserInputs.Ceiling_Length);
        xw.endElement('ceiling_length');
      }

      xw.startElement('columns');
      xw.text(uNum);
      xw.endElement('columns');

      xw.startElement('rows');
      xw.text(vNum);
      xw.endElement('rows');

      xw.startElement('patternStrength');
      xw.text(properties.UserInputs.PatternStrength);
      xw.endElement('patternStrength');

    xw.endElement('userInputs');

    xw.startElement('productAttributes');

      xw.startElement('material');
        xw.startElement('partid');
          xw.text('#-###-###'); // TO DO: add the partid as a property
        xw.endElement('partid');
        xw.startElement('name');
          xw.text(this.material);
        xw.endElement('name');
      xw.endElement('material');

      xw.startElement('hemisphere');
      xw.text(hemi);
      xw.endElement('hemisphere');

      xw.startElement('faceSizeTarget');
      xw.text(properties.BoxSize.toString());
      xw.endElement('faceSizeTarget');

      xw.startElement('depthTarget');
      xw.text(properties.Depth.toString());
      xw.endElement('depthTarget');

    xw.endElement('productAttributes');

    xw.startElement('takeOff');

        xw.startElement('parts');
        xw.text(takeOff.Parts);
        xw.endElement('parts');

        xw.startElement('magnets');
        xw.text(takeOff.Magnets);
        xw.endElement('magnets');

        xw.startElement('sheets');
        xw.text(takeOff.Sheets);
        xw.endElement('sheets');

    xw.endElement('takeOff');

    xw.startElement('Geometry');

    xw.startElement('Front');
    for (let i = 0; i < uNum; i++) {
      for (let j = 0; j < vNum; j++) {
        xw.startElement('Panel_' + '0' + '-' + i + '-' + j);
          xw.startElement('pt0');
            xw.text('{' + front[i + 1][j][0] + ',' + front[i + 1][j][1] + ',' + front[i + 1][j][2] + '}');
          xw.endElement('pt0');
          xw.startElement('pt1');
            xw.text('{' + front[i][j][0] + ',' + front[i][j][1] + ',' + front[i][j][2] + '}');
          xw.endElement('pt1');
          xw.startElement('pt2');
            xw.text('{' + front[i][j + 1][0] + ',' + front[i][j + 1][1] + ',' + front[i][j + 1][2] + '}');
          xw.endElement('pt2');
          xw.startElement('pt3');
            xw.text('{' + front[i + 1][j + 1][0] + ',' + front[i + 1][j + 1][1] + ',' + front[i + 1][j + 1][2] + '}');
          xw.endElement('pt3');
        xw.endElement('Panel_' + '0' + '-' + i + '-' + j);
      }
    }

    xw.endElement('Front');

    xw.startElement('Back');
    for (let i = 0; i < uNum; i++) {
      for (let j = 0; j < vNum; j++) {
        xw.startElement('Panel_' + '1' + '-' + i + '-' + j);
        xw.startElement('pt0');
          xw.text('{' + back[i + 1][j][0] + ',' + back[i + 1][j][1] + ',' + back[i + 1][j][2] + '}');
        xw.endElement('pt0');
        xw.startElement('pt1');
          xw.text('{' + back[i][j][0] + ',' + back[i][j][1] + ',' + back[i][j][2] + '}');
        xw.endElement('pt1');
        xw.startElement('pt2');
          xw.text('{' + back[i][j + 1][0] + ',' + back[i][j + 1][1] + ',' + back[i][j + 1][2] + '}');
        xw.endElement('pt2');
        xw.startElement('pt3');
          xw.text('{' + back[i + 1][j + 1][0] + ',' + back[i + 1][j + 1][1] + ',' + back[i + 1][j + 1][2] + '}');
        xw.endElement('pt3');
        xw.endElement('Panel_' + '1' + '-' + i + '-' + j);
      }
    }
    xw.endElement('Back');
    xw.endElement('Geometry');
    xw.endDocument();

    const xml_string = xw.toString().substring(21);
    return xml_string;
  }
}
