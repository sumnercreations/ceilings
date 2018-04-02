import { RemoveQuantityComponent } from './remove-quantity/remove-quantity.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { AddQuantityComponent } from './add-quantity/add-quantity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { ApiService } from './../_services/api.service';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { Location } from '@angular/common';
import { QuantityService } from './quantity.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  removeQtyDialogRef: MatDialogRef<any>;
  sqFootage: number;
  tilesNeeded: number;
  estimatedPrice = 0; // TODO
  tilesUsed = 0; // TODO
  estimatedSqFootage = 0; // TODO
  sqFtPerTile: number;


  // Table Properties
  dataSource: TableDataSource | null;
  dataSubject = new BehaviorSubject<Order[]>([]);
  displayedColumns = [];

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
    this.dataSource = new TableDataSource(this.dataSubject);
    this.dataSource.connect();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setTableProperties() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        this.displayedColumns = ['qty', 'material', 'total', 'edit'];
        this.headerTitle = 'Hush Blocks Tiles';
        this.sqFtPerTile = 4;
        break;
      case 'clario':
        this.displayedColumns = ['qty', 'material', 'size', 'type', 'total', 'edit'];
        this.headerTitle = 'Clario Tiles';
        this.sqFtPerTile = 4;
        break;
      case 'tetria':
        this.displayedColumns = ['qty', 'material', 'type', 'total', 'edit'];
        this.headerTitle = 'Tetria Tiles';
        this.sqFtPerTile = 4;
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
          const newLine = <any>{};
          newLine.qty = result.qty;
          newLine.material = result.material;
          newLine.total = this.getLineItemTotal(result);
          const data = this.order.data;
          data.push(newLine);
          // this.order.filter = '';
          console.log('new order', this.order);
          this.updateSummary();
        }
      })
  }

  getLineItemTotal(lineItem) {
    let lineTotal;
    const tilesArray = this.feature.getTilesPurchasedObj();
    switch (this.qtySrv.feature_type) {
      case 'hush': this.feature.getHushEstimate(tilesArray); break;
      case 'tetria': break; // TODO FIX THIS
      case 'clario': break; // TODO FIX THIS
    }
    // TODO
    lineTotal = 123.45;
    return lineTotal;
  }

  updateSummary() {
    console.log('summary', this.order.data);
    const summary = this.order.data;
    let estTotal = 0;
    let tilesUsed = 0;
    summary.map((key: any) => {
      estTotal += key.total;
      tilesUsed += key.qty;
    });
    this.estimatedPrice = estTotal;
    this.tilesUsed = tilesUsed;
    this.estimatedSqFootage = this.tilesUsed * this.sqFtPerTile;
  }

  editRow(index, row) {
    console.log('edit index/row:', index, row);
    const editRow = {index: index, row: row};
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent, {data: editRow});
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        console.log(result);
        console.log(this.order.data);
        this.order.data[index] = { result };
        console.log(this.order.data);
        this.updateSummary();
      })
  }

  deleteRow(index, row) {
    console.log('delete index/row:', index, row);
    const removeRow = {index: index, row: row};
    this.removeQtyDialogRef = this.dialog.open(RemoveQuantityComponent, {data: removeRow});
    this.removeQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        console.log(this.order.data);
        if (result === 'remove') {
          this.order.data.splice(index, 1);
        }
        console.log(this.order.data);
        this.updateSummary();
      })
  }

  requestQuote() {
    console.log('Request Quote Invoked');
  }

  viewDetails() {
    console.log('view details invoked');
  }

  calcSqFootage() {
    this.tilesNeeded = this.sqFootage / this.sqFtPerTile;
  }

}

export interface Order {
  material: any;
  qty: number;
  size: string;
  type: string;
}

export class TableDataSource extends MatTableDataSource<any> {

  constructor(private subject: BehaviorSubject<Order[]>) {
    super ();
  }

  // connect (): Observable<any> {
  //   return Observable.merge(...displayDataChanges).map(() => {
  //     // Filter data
  //     this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
  //       const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
  //       return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  //     });

  //     // Sort filtered data
  //     const sortedData = this.sortData(this.filteredData.slice());

  //     // Grab the page's slice of the filtered sorted data.
  //     const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
  //     this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
  //     return this.renderedData;
  //   });

  // //   return this.subject.asObservable();
  // }

  disconnect (  ): void {

  }

}

