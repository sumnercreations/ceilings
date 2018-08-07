import { DesignComponent } from './../../design.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-seeyond',
  templateUrl: './design-seeyond.component.html',
  styleUrls: ['../../design.component.scss', './design-seeyond.component.scss']
})
export class DesignSeeyondComponent extends DesignComponent implements OnInit {
  selectedTessellation = this.seeyond.tessellation;
  pattern_strength = this.seeyond.pattern_strength;
  strengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  patternRelief: string;
  patternReliefOptions = [
    {
      value: 'both',
      name: 'front & back'
    },
    {
      value: 'front',
      name: 'front'
    },
    {
      value: 'back',
      name: 'back'
    }
  ];
  ngOnInit() {}

  seeyondDimensionsDidChange() {
    this.seeyond.setMaxMinDimensions();
    this.seeyond.updateDimensions();
  }

  seeyondUpdateSelectedFeature(selectedFeature) {
    this.seeyond.updateSeeyondFeature(selectedFeature);
  }

  updateSelectedTessellation(tessellationName: string) {
    if (this.seeyond.quoted) {
      this.alertQuoted();
      return;
    }
    this.seeyond.tessellationStr = tessellationName;
    const tessellation = this.seeyond.getTesslationNumber(tessellationName);
    this.selectedTessellation = this.seeyond.tessellation = tessellation;

    // update the visualization
    this.seeyond.reloadVisualization();
  }

  updatePatternStrength(strength?: number) {
    if (!strength) {
      strength = this.seeyond.pattern_strength;
    }
    this.pattern_strength = this.seeyond.pattern_strength = strength;

    // update the visualization
    this.seeyond.reloadVisualization();
  }

  updatePatternRelief() {
    switch (this.patternRelief) {
      case 'front':
        this.seeyond.front_relief = true;
        this.seeyond.back_relief = false;
        break;

      case 'back':
        this.seeyond.front_relief = false;
        this.seeyond.back_relief = true;
        break;

      default:
        this.seeyond.front_relief = true;
        this.seeyond.back_relief = true;
        break;
    }

    this.debug.log('seeyond-design', this.seeyond.front_relief);
    this.debug.log('seeyond-design', this.seeyond.back_relief);

    // update the visualization
    this.seeyond.reloadVisualization();
  }
}
