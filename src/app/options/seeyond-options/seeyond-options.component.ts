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
    this.seeyond.updateFeature(feature);
  }

  seeyondValidateOptions() {
    let isValid = false;
    if (!!this.seeyond.design_name) { isValid = true; }
    return isValid;
  }

  startDesigning() {
    this.seeyond.onDimensionsChange.emit();
    this.seeyond.updateFeature(this.seeyond.seeyond_feature_type);
    this.dialogRef.close('start designing');
  }

}
