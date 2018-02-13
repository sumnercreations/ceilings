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

  ngOnInit() {
    // // initialize the feature based on the URL path.
    this.route.params.subscribe(params => {
      console.log(params);
    })

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
    .subscribe(
      data => {
        this.seeyond.updateEstimatedAmount();
      }
    );
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

  public updateFeatureMeasurement(measurement: number, name: string) {
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

      case 'height':
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

      case 'angle':
        this.seeyond.angle = measurement;
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
        alert(name + ' is not a valid measurement');
        break;
    }

    this.seeyond.reloadVisualization();
  }

}
