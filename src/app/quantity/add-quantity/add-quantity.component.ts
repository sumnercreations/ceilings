import { ClarioGridsService } from './../../_services/clario-grids.service';
import { DebugService } from './../../_services/debug.service';
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
  featureTiles: any;
  // Selections
  selectedMaterial: string;
  selectedMaterialImg: string;
  selectedQuantity: number;
  selectedTile = '00';

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputRow: any,
    public dialogRef: MatDialogRef<AddQuantityComponent>,
    public materialsService: MaterialsService,
    public qtySrv: QuantityService,
    public feature: Feature,
    public debug: DebugService,
    public clarioGrids: ClarioGridsService
  ) {}

  ngOnInit() {
    this.getFeatureMaterials();
    this.featureTiles = this.feature.tilesArray[this.qtySrv.feature_type];
  }

  ngAfterContentInit() {
    if (!!this.inputRow) {
      this.loadRowForEdit();
    }
  }

  loadRowForEdit() {
    this.debug.log('quantity', this.inputRow);
    this.isEditing = true;
    this.updateSelectedMaterial(this.inputRow.material);
    this.quantityDidChange(this.inputRow.used);
    this.updateSelectedTile(this.inputRow.tile);
  }

  getFeatureMaterials() {
    let requiredMaterials: any;
    switch (this.qtySrv.feature_type) {
      case 'hush':
        requiredMaterials = this.materialsService.materials.felt.sola;
        break;
      case 'tetria':
        requiredMaterials = this.materialsService.materials.felt.merino;
        break;
      case 'clario':
        requiredMaterials = this.materialsService.materials.felt.sola;
        break;
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
      case 'hush':
        materialImg = `/assets/images/tiles/${this.selectedTile}/${this.selectedMaterial}.png`;
        break;
      case 'tetria':
        materialImg = `/assets/images/tiles/${this.selectedTile}/${this.selectedMaterial}.png`;
        break;
      case 'clario':
        let tileType;
        let tileImageType;
        if (this.selectedTile === '00') {
          // flat tile selected
          tileType = 'tiles';
          tileImageType = '00';
        } else {
          tileType = 'baffles';
          const squareImgs = ['24', '600', '625'];
          tileImageType = squareImgs.includes(this.selectedTile) ? '24' : '48';
        }
        materialImg = `/assets/images/${tileType}/${tileImageType}/${this.selectedMaterial}.png`;
        break;
    }
    this.selectedMaterialImg = materialImg;
  }

  updateSelectedTile(tile) {
    console.log('updateSelectedTile:', tile);
    this.selectedTile = tile.tile;
    this.updateMaterialImg();
  }

  quantityDidChange(quantity) {
    this.selectedQuantity = quantity;
  }

  validateQtyInputs() {
    let isValid = false;
    switch (this.qtySrv.feature_type) {
      case 'hush':
        isValid = !!this.selectedMaterial && this.selectedQuantity > 0;
        break;
      case 'tetria':
        isValid = !!this.selectedMaterial && this.selectedQuantity > 0;
        break; // TODO FIX THIS
      case 'clario':
        isValid = !!this.selectedMaterial && this.selectedQuantity > 0;
        break; // TODO FIX THIS
    }
    return isValid;
  }

  cancel() {
    this.selectedMaterial = this.inputRow.material;
    this.selectedQuantity = this.inputRow.qty;
    this.dialogRef.close();
  }

  addToOrder() {
    const pkgQty = this.feature.getPackageQty(this.selectedTile);
    const key = `${this.selectedMaterial}-${this.selectedTile}`;
    const selections = {
      [key]: {
        purchased: pkgQty * Math.ceil(this.selectedQuantity / pkgQty),
        image: this.selectedMaterialImg,
        used: this.selectedQuantity,
        material: this.selectedMaterial,
        tile: this.selectedTile
      }
    };
    this.dialogRef.close(selections);
  }
}
