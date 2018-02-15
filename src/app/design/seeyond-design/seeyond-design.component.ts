import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { DesignComponent } from './../design.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NavigationEnd } from '@angular/router/src/events';

@Component({
  selector: 'app-seeyond-design',
  templateUrl: './seeyond-design.component.html',
  styleUrls: ['../design.component.css', './seeyond-design.component.css']
})
export class SeeyondDesignComponent extends DesignComponent implements OnInit, OnDestroy, AfterContentInit {
  seeyondMaterials = this.feature.newMaterialsArray['seeyond'];
  pattern_strength = this.seeyond.pattern_strength;
  strengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedTessellation = this.seeyond.tessellation;
  selectedMaterial = this.feature.material;
  estimated_amount: any;
  params: any;
  selectedFeature: any;
  dimensionsString: string;

  ngOnInit() {
    this.seeyond.onDimensionsChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.dimensionsString = this.seeyond.getDimensionString();
      });
    // // Check for a logged in user.
    // const seeyondUser = localStorage.getItem('seeyondUser');
    // if (seeyondUser) {
    //   // set up the user values
    //   const parsedUser = JSON.parse(seeyondUser);
    //   this.user.uid = parsedUser.uid;
    //   this.user.email = parsedUser.email;
    //   this.user.firstname = parsedUser.firstname;
    //   this.user.lastname = parsedUser.lastname;
    // } else {
    //   // create a new empty user
    //   this.user = new User;
    // }
  }

  ngAfterContentInit() {
    // subscribe to the onFeatureUpdated event to update the price.
    this.seeyond.onFeatureUpdated
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.seeyond.updateEstimatedAmount();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public updateSelectedTessellation(tessellationName: string) {
    const tessellation = this.seeyond.getTesslationNumber(tessellationName);
    this.selectedTessellation = this.seeyond.tessellation = tessellation;

    // update the visualization
    this.seeyond.reloadVisualization();
  }

  public updateSelectedMaterial(material: string) {
    this.selectedMaterial = this.seeyond.material = material;
    this.seeyond.sheet_part_id = this.seeyond.seeyond_felt_sheet_mapping[material];

    // update the visualization
    this.seeyond.redrawVisualization();
  }

  public updatePatternStrength(strength: number) {
    this.pattern_strength = this.seeyond.pattern_strength = strength;

    // update the visualization
    this.seeyond.reloadVisualization();
  }

  public updateUnits(units) {
    this.feature.updateGridUnits(units);
    this.dimensionsString = this.seeyond.getDimensionString(units);
  }

  public updateFeatureMeasurement(measurement: number, name: string) {
    this.updateDimensions();
    switch (name) {
      case 'width':
        if (measurement < 50) {
          this.seeyond.width = 50;
          this.alert.error('The minimum width is 50 inches');
        } else if ((this.seeyond.seeyond_feature_index === 0 || this.seeyond.seeyond_feature_index === 1) && measurement > 240) {
          this.seeyond.width = 240;
          this.alert.error('The maximum width for partitions is 240 inches');
        }else if (measurement > 480) {
          this.seeyond.width = 480;
          this.alert.error('The maximum width for walls and ceilings is 480 inches');
        } else if (this.seeyond.seeyond_feature_index === 1 && this.seeyond.radius < (measurement * .5) + 1) {
          this.seeyond.width = measurement;
          this.seeyond.radius = (this.seeyond.width * .5) + 1;
          this.alert.error('The radius must be greater than half the width. Radius set to: ' + this.seeyond.radius);
        } else {
          this.seeyond.width = measurement;
        }
        break;

      case 'length':
        if (measurement < 50) {
          this.seeyond.height = 50;
          this.alert.error('The minimum height is 50 inches');
        } else if ((this.seeyond.seeyond_feature_index === 0 || this.seeyond.seeyond_feature_index === 1) && measurement > 84) {
          this.seeyond.height = 84;
          this.alert.error('The maximum height for partitions is 84 inches');
        } else if (measurement > 480) {
          this.seeyond.height = 480;
          this.alert.error('The maximum height for walls and ceilings is 480 inches');
        } else {
          this.seeyond.height = measurement;
        }
        break;

      case 'radius':
        const halfRadius = (this.seeyond.width * .5) + 1;
        if (measurement < 30) {
          this.seeyond.radius = (halfRadius < 30 ) ? 30 : halfRadius;
          this.alert.error('The minimum radius is 30 inches and must be greater than half the width');
        } else if (measurement > 300) {
          this.seeyond.radius = (halfRadius < 300 ) ? 300 : halfRadius;
          this.alert.error('The maximum radius is 300 inches.');
        } else if (measurement < (this.seeyond.width * .5) + 1) {
          this.seeyond.radius = (this.seeyond.width * .5) + 1;
          this.alert.error('The radius must be greater than half the width. Radius set to: ' + this.seeyond.radius);
        } else {
          this.seeyond.radius = measurement;
        }
        break;

      case 'ceiling_length':
        if (measurement < 50) {
          this.seeyond.ceiling_length = 50;
          this.alert.error('The minimum ceiling length is 50 inches');
        } else if (measurement > 144) {
          this.seeyond.ceiling_length = 144;
          this.alert.error('The maximum ceiling length is 144 inches');
        } else {
          this.seeyond.ceiling_length = measurement;
        }
        break;

      default:
        this.alert.error(name + ' is not a valid measurement');
        break;
    }
    this.dimensionsString = this.seeyond.getDimensionString();
    this.seeyond.reloadVisualization();
  }

  public updateDimensions() {
    const currentWidth = this.seeyond.width;
    const currentHeight = this.seeyond.height;
    const currentCeilLength = this.seeyond.ceiling_length;
    const currentRadius = this.seeyond.radius;
    const units = this.seeyond.units;
    const max_min = this.seeyond.materialsService.seeyondMinMaxDimensions[this.seeyond.seeyond_feature_index][units];
    const widthMin = max_min['widthMin'];
    const widthMax = max_min['widthMax'];
    const heightMin = max_min['heightMin'];
    const heightMax = max_min['heightMax'];
    const ceilLengthMin = max_min['ceilLengthMin'];
    const ceilLengthMax = max_min['ceilLengthMax'];

    // TODO add radius

    if (currentWidth < widthMin) {
      this.seeyond.width = widthMin;
      this.alert.error(`The minimum width is ${widthMin} ${units}`);
    }
    if (currentWidth > widthMax) {
      this.seeyond.width = widthMax;
      this.alert.error(`The maximum width is ${widthMax} ${units}`);
    }
    if (currentHeight < heightMin) {
      this.seeyond.height = heightMin;
      this.alert.error(`The minimum height is ${heightMin} ${units}`);
    }
    if (currentHeight > heightMax) {
      this.seeyond.height = heightMax;
      this.alert.error(`The maximum height is ${heightMax} ${units}`);
    }
    if (currentCeilLength < ceilLengthMin) {
      this.seeyond.ceiling_length = ceilLengthMin;
      this.alert.error(`The minimum ceilLength is ${ceilLengthMin} ${units}`);
    }
    if (currentCeilLength > ceilLengthMax) {
      this.seeyond.ceiling_length = ceilLengthMax;
      this.alert.error(`The maximum ceilLength is ${ceilLengthMax} ${units}`);
    }
  }

}
