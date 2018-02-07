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

    // this.router.events
    // .filter(event => event instanceof NavigationEnd)
    // .subscribe((event) => {
    //   this.debug.log('seeyond', event);
    //   this.params = this.route.params.subscribe(params => {
    //     this.debug.log('seeyond', params);
    //   // init the seeyond prices
    //   this.seeyondService.getPrices().subscribe(response => {
    //     this.debug.log('seeyond', response);
    //     this.seeyond.prices = response;
    //       // feature - default values
    //       this.selectedFeature = params['feature'];

    //       if (!Number(this.selectedFeature)) {
    //         this.seeyond.updateFeature(this.selectedFeature)
    //       }else if (Number(this.selectedFeature)) {
    //         this.seeyondService.loadFeature(this.selectedFeature).subscribe(
    //           feature => {
    //             // if feature was found and is not archived
    //             if (feature != null && !feature.archived) {
    //               this.seeyond.loadFeature(feature);
    //             }else {
    //               // redirect to default wall feature
    //               this.router.navigate(['/feature', 'wall']);
    //             }
    //           },
    //           error => {
    //             if (error) {
    //               this.alert.apiAlert(error);
    //             }
    //           }
    //         );
    //       }
    //     });
    //   });
    //     // unsubscribe params
    //     this.params.unsubscribe();
    // });

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
        this.estimated_amount = this.seeyond.getFormattedAmount();
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

}
