import { QuantityService } from './../quantity.service';
import { MaterialsService } from 'app/_services/materials.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.css']
})
export class AddQuantityComponent implements OnInit {
  materials: any;
  position = 'above';

  // Selections
  selectedMaterial: string;
  selectedQuantity: number;

  constructor(
    private dialogRef: MatDialogRef<AddQuantityComponent>,
    private materialsService: MaterialsService,
    private qtySrv: QuantityService
  ) { }

  ngOnInit() {
    this.getFeatureMaterials();
  }

  getFeatureMaterials() {
    let requiredMaterials: any;
    switch (this.qtySrv.feature_type) {
      case 'hush': requiredMaterials = this.materialsService.materials.felt.sola; break;
      case 'seeyond': requiredMaterials = this.materialsService.materials.felt.sola; break;
      case 'tetria': requiredMaterials = this.materialsService.materials.felt.merino; break;
      case 'clario': requiredMaterials = this.materialsService.materials.felt.sola; break;
      case 'velo':
        requiredMaterials = {felt: undefined, varia: undefined};
        requiredMaterials.felt = this.materialsService.materials.felt.merino;
        requiredMaterials.varia = this.materialsService.materials.varia;
      break;
    }
    this.materials = requiredMaterials;
  }

  updateSelectedMaterial(material) {
    this.selectedMaterial = material;
    console.log('selectedMaterial:', material);
  }

  quantityDidChange(quantity) {
    console.log('selectedQuantity:', quantity);
    this.selectedQuantity = quantity;
  }

  cancel() {
    this.dialogRef.close();
  }

  addToOrder() {
    console.log('add to order invoked');
  }
}
