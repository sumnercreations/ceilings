import { DesignComponent } from './../../design.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-design-materials',
  templateUrl: './design-materials.component.html',
  styleUrls: ['../../design.component.scss', './design-materials.component.scss']
})
export class DesignMaterialsComponent extends DesignComponent implements OnInit {
  ngOnInit() {
    this.materials = this.feature.getFeatureMaterials();
  }
}
