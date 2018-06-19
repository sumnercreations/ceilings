import { Component, OnInit } from '@angular/core';
import { OptionsComponent } from '../options.component';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['../../options/options.component.css', './profile-options.component.css']
})
export class ProfileOptionsComponent extends OptionsComponent {
  updateSelectedFeature(feature) {
    console.log('updateSelectedFeature:', feature);
    // this.seeyond.updateSeeyondFeature(feature);
  }

  dimensionsDidChange() {
    console.log('dimensionsDidChange');
    // this.seeyond.setMaxMinDimensions();
    // this.seeyond.updateDimensions();
  }

  seeyondValidateOptions() {
    console.log('seeyondValidateOptions');
    // let isValid = false;
    // if (!!this.seeyond.design_name) { isValid = true; }
    // return isValid;
  }

  startDesigning() {
    console.log('startDesigning');
    this.seeyond.onDimensionsChange.emit();
    this.dialogRef.close('start designing');
  }
}
