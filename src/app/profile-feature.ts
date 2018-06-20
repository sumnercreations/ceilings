import { DebugService } from './_services/debug.service';
import { Feature } from './feature';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileFeature {
  feature_type = 'swoon';
  $featureTypeChange = new EventEmitter();
  $buildSwoonGrid = new EventEmitter();

  constructor(private debug: DebugService) {}

  updateProfileFeature(feature) {
    console.log('updateProfileFeature:', feature);
    this.feature_type = feature;
    this.$featureTypeChange.emit(feature);
  }

  buildFeatureGrid() {
    switch (this.feature_type) {
      case 'swoon':
        this.$buildSwoonGrid.emit();
        break;
      default:
        this.debug.log('profile-feature', `buildFeatureGrid ${feature} not found`);
        break;
    }
  }
}
