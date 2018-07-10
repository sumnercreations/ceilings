import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-remove-quantity',
  templateUrl: './remove-quantity.component.html',
  styleUrls: ['./remove-quantity.component.css']
})
export class RemoveQuantityComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public selection: any,
    private dialogRef: MatDialogRef<RemoveQuantityComponent>
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }

  removeFromOrder() {
    this.dialogRef.close('remove');
  }
}
