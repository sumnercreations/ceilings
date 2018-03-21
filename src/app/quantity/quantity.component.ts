import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
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
  order: any;
  orderName = '';
  headerTitle = '';
  addQtyDialogRef: MatDialogRef<any>;

  // Table Properties
  displayedColumns = [];
  hushOrder: HushQty[];
  clarioOrder: ClarioQty[];
  tetriaOrder: TetriaQty[];
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // ELEMENT_DATA: Element[] = [
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  //   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  //   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  //   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  //   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  //   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  //   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  //   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  //   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  //   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  //   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  // ];
  // dataSource = this.ELEMENT_DATA;

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
        this.order = this.hushOrder;
        this.displayedColumns = ['qty', 'imgUrl', 'material'];
        this.headerTitle = 'Hush Blocks Tiles';
        break;
      case 'clario':
        this.displayedColumns = ['qty', 'imgUrl', 'material', 'size', 'type'];
        this.order = this.clarioOrder;
        this.headerTitle = 'Clario Tiles';
        break;
      case 'tetria':
        this.displayedColumns = ['qty', 'imgUrl', 'material', 'type'];
        this.order = this.tetriaOrder;
        this.headerTitle = 'Tetria Tiles';
        break;
    }
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
        // add result to order array
      })
  }

  requestQuote() {
    console.log('Request Quote Invoked');
  }

  viewDetails() {
    console.log('view details invoked');
  }

}

// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface HushQty {
  material: string;
  qty: number;
  imgUrl: string;
}

export interface ClarioQty {
  material: string;
  qty: number;
  size: string;
  type: string;
  imgUrl: string;
}

export interface TetriaQty {
  material: string;
  qty: number;
  type: string;
  imgUrl: string;
}

