import { MatDialog, MatDialogRef, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { AddQuantityComponent } from './add-quantity/add-quantity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { ApiService } from './../_services/api.service';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { QuantityService } from './quantity.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject();
  materials: any;
  panelOpenState = false;
  order = new MatTableDataSource();
  orderName = '';
  headerTitle = '';
  addQtyDialogRef: MatDialogRef<any>;
  sqFootage: number;
  tilesNeeded: number;
  estimatedPrice: number = 123.45;
  tilesUsed: number = 123;
  estimatedSqFootage: number = 123;

  // Table Properties
  displayedColumns = [];
  // hushOrder: HushQty[];
  // clarioOrder: ClarioQty[];
  // tetriaOrder: TetriaQty[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature,
    private alert: AlertService,
    private location: Location,
    private dialog: MatDialog,
    public qtySrv: QuantityService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['type'] === 'hush') { this.location.go(this.router.url.replace(/hush\/quantity/g, 'hush-blocks/quantity')); }
      this.qtySrv.feature_type = this.feature.setFeatureType(params['type']);
      this.materials = this.feature.getFeatureMaterials();
      this.setTableProperties();
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setTableProperties() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        this.displayedColumns = ['qty', 'imgUrl', 'material', 'total', 'edit'];
        this.headerTitle = 'Hush Blocks Tiles';
        break;
      case 'clario':
        this.displayedColumns = ['qty', 'imgUrl', 'material', 'size', 'type', 'total', 'edit'];
        this.headerTitle = 'Clario Tiles';
        break;
      case 'tetria':
        this.displayedColumns = ['qty', 'imgUrl', 'material', 'type', 'total', 'edit'];
        this.headerTitle = 'Tetria Tiles';
        break;
    }
    console.log('order', this.order);
  }

  backToDesign() {
    this.router.navigate([this.feature.feature_type, 'design']);
  }

  print() {
    window.print();
  }

  addToOrder() {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent);
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        console.log('addToOrder result:', result);
        if (!!result) {
          console.log('old order', this.order);
          // add result to order array
          const newLine = <any>{};
          newLine.qty = result.qty;
          newLine.material = result.material.material;
          newLine.imgUrl = result.material.image;

          const tilesArray = this.feature.getTilesPurchasedObj;
          switch (this.qtySrv.feature_type) {
            case 'hush': newLine.total = this.feature.getHushEstimate(tilesArray); break;
            case 'tetria':
            break; // TODO FIX THIS
            case 'clario':
            break; // TODO FIX THIS
          }
          newLine.total = 123.45;
          const data = this.order.data;
          data.push(newLine);
          this.order.data = data;
          this.order.filter = '';
          console.log('new order', this.order);
        }
      })
  }

  editRow(index, row) {
    console.log('edit index/row:', index, row);
  }

  deleteRow(index, row) {
    console.log('delete index/row:', index, row);
  }

  requestQuote() {
    console.log('Request Quote Invoked');
  }

  viewDetails() {
    console.log('view details invoked');
  }

  calcSqFootage() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        // each hush blocks tile is 4 sq ft.
        this.tilesNeeded = this.sqFootage / 4;
      break;
      case 'tetria':
        this.tilesNeeded = this.sqFootage / 3; // TODO FIX THIS
      break;
      case 'clario':
        this.tilesNeeded = this.sqFootage / 5; // TODO FIX THIS
      break;
    }
  }

}

// export interface HushQty {
//   material: string;
//   qty: number;
// }

// export interface ClarioQty {
//   material: string;
//   qty: number;
//   size: string;
//   type: string;
// }

// export interface TetriaQty {
//   material: string;
//   qty: number;
//   type: string;
// }

// export class ExampleDataSource extends MatTableDataSource<any> {
//   constructor(private _exampleDatabase: ExampleDatabase) {
//   super();
//   }
//   connect(): Observable<UserData[]> {
//   return this._exampleDatabase.dataChange;
//   }
//   disconnect() {}
//   }

