import { Component, OnInit } from '@angular/core';
import { OptionsComponent } from './../options.component';
import { SeeyondFeature } from './../../seeyond-feature';

@Component({
  selector: 'app-seeyond-options',
  templateUrl: './seeyond-options.component.html',
  styleUrls: ['../../options/options.component.css', './seeyond-options.component.css']
})

export class SeeyondOptionsComponent extends OptionsComponent {

  updateSelectedFeature(feature) {
    this.seeyondFeature.updateFeature(feature);
  }

  seeyondValidateOptions() {
    let isValid = false;
    if (!!this.seeyondFeature.design_name) { isValid = true; }
    return isValid;
  }

  startDesigning() {
    this.dialogRef.close('start designing');
  }
}
