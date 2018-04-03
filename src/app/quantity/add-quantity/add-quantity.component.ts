import { Feature } from './../../feature';
import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { QuantityService } from './../quantity.service';
import { MaterialsService } from 'app/_services/materials.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.css']
})
export class AddQuantityComponent implements OnInit, AfterContentInit {
  materials: any;
  position = 'above';
  isEditing = false;
  oldRowData: any;
  // Selections
  selectedMaterial: string;
  selectedMaterialImg: string;
  selectedQuantity: number;
  selectedTileType = '00';

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputRow: any,
    private dialogRef: MatDialogRef<AddQuantityComponent>,
    private materialsService: MaterialsService,
    private qtySrv: QuantityService,
    private feature: Feature
  ) { }

  ngOnInit() {
    this.getFeatureMaterials();
  }

  ngAfterContentInit() {
    if (!!this.inputRow) {
      this.isEditing = true;
      console.log('editing row:', this.inputRow);
      this.updateSelectedMaterial(this.inputRow.material);
      this.quantityDidChange(this.inputRow.used);
      console.log(this.selectedMaterial, this.selectedQuantity);
    }
  }

  getFeatureMaterials() {
    let requiredMaterials: any;
    switch (this.qtySrv.feature_type) {
      case 'hush': requiredMaterials = this.materialsService.materials.felt.sola; break;
      case 'tetria': requiredMaterials = this.materialsService.materials.felt.merino; break;
      case 'clario': requiredMaterials = this.materialsService.materials.felt.sola; break;
    }
    this.materials = requiredMaterials;
  }

  updateSelectedMaterial(material) {
    this.selectedMaterial = material;
    this.updateMaterialImg();
  }

  updateMaterialImg() {
    let materialImg;
    switch (this.qtySrv.feature_type) {
      case 'hush': materialImg = `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`; break;
      case 'tetria': materialImg = `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`; break; // TODO FIX THIS
      case 'clario': materialImg = `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`; break; // TODO FIX THIS
    }
    this.selectedMaterialImg = materialImg;
  }

  quantityDidChange(quantity) {
    this.selectedQuantity = quantity;
  }

  validateQtyInputs() {
    let isValid = false;
    switch (this.qtySrv.feature_type) {
      case 'hush': isValid = (!!this.selectedMaterial && (this.selectedQuantity > 0)); break;
      case 'tetria': isValid = (!!this.selectedMaterial && (this.selectedQuantity > 0)); break; // TODO FIX THIS
      case 'clario': isValid = (!!this.selectedMaterial && (this.selectedQuantity > 0)); break; // TODO FIX THIS
    }
    return isValid;
  }

  cancel() {
    this.selectedMaterial = this.inputRow.material;
    this.selectedQuantity = this.inputRow.qty;
    this.dialogRef.close();
  }

  addToOrder() {
    let selections = {};
    const pkgQty = this.feature.getPackageQty(this.selectedTileType);
    const key = `${this.selectedMaterial}-${this.selectedTileType}`
    switch (this.qtySrv.feature_type) {
      case 'hush':
        selections = {[key]: {
          purchased: pkgQty * Math.ceil(this.selectedQuantity / pkgQty),
          image: `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`,
          used: this.selectedQuantity,
          material: this.selectedMaterial,
          tile: this.selectedTileType
        }}
      break;
      case 'tetria': // TODO
        selections = {[key]: {
          purchased: pkgQty * Math.ceil(this.selectedQuantity / pkgQty),
          image: `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`,
          used: this.selectedQuantity,
          material: this.selectedMaterial,
          tile: this.selectedTileType
        }}
      break;
      case 'clario': // TODO
        selections = {[key]: {
          purchased: pkgQty * Math.ceil(this.selectedQuantity / pkgQty),
          image: `/assets/images/tiles/${this.selectedTileType}/${this.selectedMaterial}.png`,
          used: this.selectedQuantity,
          material: this.selectedMaterial,
          tile: this.selectedTileType
        }}
      break;
    }
    this.dialogRef.close(selections);
  }
}
