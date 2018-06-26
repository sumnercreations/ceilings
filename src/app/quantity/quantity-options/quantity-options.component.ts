import { ClarioGridsService } from './../../_services/clario-grids.service';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material';
import { Feature } from './../../_features/feature';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-quantity-options',
  templateUrl: './quantity-options.component.html',
  styleUrls: ['../../options/options.component.css', './quantity-options.component.css']
})
export class QuantityOptionsComponent implements OnInit, AfterContentChecked {
  title = 'Order By Quantity';

  constructor(
    public feature: Feature,
    public dialogRef: MatDialogRef<QuantityOptionsComponent>,
    public location: Location,
    public clarioGrids: ClarioGridsService
  ) {}

  ngOnInit() {}

  ngAfterContentChecked() {
    const featureType = this.capitalizeFirstLetter(this.feature.feature_type);
    this.title = featureType !== 'hush' ? `${featureType} Tiles By Quantity` : `${featureType} Blocks By Quantity`;
  }

  gridSizeChanged(selection) {
    this.clarioGrids.gridSizeSelected(selection);
  }

  tileSizeChanged(selection) {
    this.clarioGrids.tileSizeSelected(selection);
    this.clarioGrids.setGridTileSizeOptions();
  }

  goToLanding() {
    this.dialogRef.close('cancel');
    this.feature.navToLanding();
  }

  validateOptions() {
    let valid = !!this.feature.design_name;
    if (this.feature.feature_type === 'clario') {
      valid = valid && !!this.feature.grid_type && !!this.clarioGrids.selectedTileSize;
    }
    return valid;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
