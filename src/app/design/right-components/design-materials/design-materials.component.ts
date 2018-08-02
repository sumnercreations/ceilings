import { DesignComponent } from './../../design.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-materials',
  templateUrl: './design-materials.component.html',
  styleUrls: ['../../design.component.scss', './design-materials.component.scss']
})
export class DesignMaterialsComponent extends DesignComponent implements OnInit {
  showTileSelection = true;
  ngOnInit() {
    this.materials = this.feature.getFeatureMaterials();
    this.featureTiles = this.feature.tilesArray[this.feature.feature_type];
    if (this.feature.feature_type === 'hush' || this.feature.feature_type === 'hushSwoon') {
      this.showTileSelection = false;
    }
  }
}
