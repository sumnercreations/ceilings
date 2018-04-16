import { QuoteDialogComponent } from './../quote-dialog/quote-dialog.component';
import { LoadDesignComponent } from './../load-design/load-design.component';
import { LoginComponent } from './../login/login.component';
import { SaveDesignComponent } from './../save-design/save-design.component';
import { User } from 'app/_models/user';
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
import { QuantityService, TileObj } from './quantity.service';
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
  feature_type: string;
  materials: any;
  panelOpenState = false;
  order = new MatTableDataSource();
  orderName = '';
  headerTitle = '';
  addQtyDialogRef: MatDialogRef<any>;
  removeQtyDialogRef: MatDialogRef<any>;
  saveQtyDialogRef: MatDialogRef<any>;
  loadQtyDialogRef: MatDialogRef<any>;
  loginDialogRef: MatDialogRef<any>;
  quoteDialogRef: MatDialogRef<any>;
  sqFootage: number;
  tilesNeeded: number;
  estimatedPrice = 0;
  tilesSelected: number;
  sqFtUsed = 0;
  sqFtReceiving = 0;
  sqFtPerTile: number;
  tryingRequestQuote = false;


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
    public qtySrv: QuantityService,
    public user: User
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // initial setup
      if (params['type'] === 'hush') { this.location.go(this.router.url.replace(/hush\/quantity/g, 'hush-blocks/quantity')); }
      this.qtySrv.feature_type = this.feature_type = this.feature.setFeatureType(params['type']);
      this.materials = this.feature.getFeatureMaterials();
      this.setTableProperties();

      // load saved if included in params
      const qtyId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
      if (!!qtyId) {
        this.api.loadDesign(qtyId).subscribe(qtyOrder => {
          this.debug.log('quantity', `qtyOrder`);
          if (!qtyOrder.is_quantity_order) {
            this.router.navigate([`${qtyOrder.feature_type}/design`, qtyOrder.id]);
          }
          if (qtyOrder.feature_type !== this.feature_type) {
            this.location.go(`${qtyOrder.feature_type}/quantity/${qtyOrder.id}`);
          }
          this.feature.id = qtyOrder.id;
          this.feature.uid = qtyOrder.uid;
          this.feature.design_name = qtyOrder.design_name;
          this.feature.tiles = qtyOrder.tiles;
          this.feature.material = qtyOrder.material;
          this.feature.quoted = qtyOrder.quoted;
          const tilesObj = JSON.parse(qtyOrder.tiles);
          const rowsToAdd = Object.keys(tilesObj).map(key => tilesObj[key]);
          rowsToAdd.map(row => {
            const newRow = {[`${row.material}-${row.tile}`]: row };
            this.doAddRow(newRow);
          });
        })
      }
    })
    this.dataSource = new TableDataSource(this.dataSubject);
    this.dataSource.connect();
    this.feature.tile_size = 48; // for quantity messaging
    this.feature.is_quantity_order = true;

    this.api.onUserLoggedIn
      // .takeUntil(this.ngUnsubscribe)
      .subscribe(apiUser => {
        this.user.uid = apiUser.uid;
        this.user.email = apiUser.email;
        this.user.firstname = apiUser.firstname;
        this.user.lastname = apiUser.lastname;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setTableProperties() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        this.displayedColumns = ['ordered', 'material', 'total', 'edit'];
        this.headerTitle = 'Hush Blocks Tiles ';
        break;
      case 'clario':
        this.displayedColumns = ['ordered', 'material', 'total', 'edit'];
        this.headerTitle = 'Clario Tiles';
        break;
      case 'tetria':
        this.displayedColumns = ['ordered', 'material', 'total', 'edit'];
        this.headerTitle = 'Tetria Tiles';
        break;
    }
  }

  backToDesign() {
    this.router.navigate([this.feature.feature_type, 'design']);
  }

  addToOrder() {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent);
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(requestedRow => {
        if (!!requestedRow) {
          let isMultiple = false;
          const res = requestedRow[Object.keys(requestedRow)[0]];
          this.order.data.map(row => {
            const rowStr = JSON.stringify(row);
            const newRow: TileRow = JSON.parse(rowStr);
            if (newRow.image === res.image) {
              isMultiple = true;
              this.combineRows(requestedRow, row);
            }
          })
          if (!isMultiple) { this.doAddRow(requestedRow); }
        }
      })
  }

  combineRows(requestedRow, matchedRow) {
    const pkgQty = this.feature.getPackageQty(matchedRow.tile);
    const requestedRowFmtd = this.setRowData(requestedRow);
    matchedRow.used += requestedRowFmtd.used;
    matchedRow.total += requestedRowFmtd.total;
    matchedRow.purchased = pkgQty * Math.ceil(matchedRow.used / pkgQty);
    this.updateSummary();
  }

  setRowData(row) {
    this.debug.log('quantity', row);
    this.getRowEstimate(row); // sets feature.estimated_amount
    const newRow = row[Object.keys(row)[0]];
    newRow.total = this.feature.estimated_amount;
    newRow.tileSqFt = this.getTileSqFt(newRow.tile);
    return newRow;
  }

  doAddRow(row) {
    this.debug.log('quantity', row);
    const newRow = this.setRowData(row);
    this.order.data.push(newRow);
    this.order.data = this.order.data.slice(); // refreshes the table
    this.updateSummary();
  }

  editRow(index, row) {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent, {data: row});
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (!!result) {
          this.doEditRow(index, result);
        }
      })
  }

  doEditRow(index, row) {
    this.getRowEstimate(row); // sets feature.estimated_amount
    const editRow = row[Object.keys(row)[0]];
    editRow.total = this.feature.estimated_amount;
    editRow.tileSqFt = this.getTileSqFt(editRow.tile);
    this.order.data[index] = editRow;
    this.order.data = this.order.data.slice(); // refreshes the table
    this.updateSummary();
  }

  deleteRow(index, row) {
    const removeRow = {index: index, row: row};
    this.removeQtyDialogRef = this.dialog.open(RemoveQuantityComponent, {data: removeRow});
    this.removeQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result === 'remove') {
          this.order.data.splice(index, 1);
        }
        this.order.data = this.order.data.slice();
        this.updateSummary();
      })
  }

  getRowEstimate(row) {
    switch (this.qtySrv.feature_type) {
      case 'hush': this.feature.getHushEstimate(row); break;
      case 'tetria': this.feature.getTetriaEstimate(row); break;
      case 'clario': this.feature.getClarioEstimate(row); break;
    }
  }

  updateSummary() {
    const summary = this.order.data;
    this.debug.log('quantity', summary);
    let estTotal = 0;
    let tilesUsed = 0;
    let tilesReceiving = 0;
    let sqFtUsed = 0;
    let sqFtReceiving = 0;
    summary.map((row: any) => {
      estTotal += row.total;
      tilesUsed += row.used;
      tilesReceiving += row.purchased;
      sqFtUsed += (row.used * row.tileSqFt);
      sqFtReceiving  += (row.purchased * row.tileSqFt);
    });
    this.estimatedPrice = estTotal;
    this.feature.qtyTilesReceiving = tilesReceiving;
    this.feature.qtyTilesUsed = tilesUsed;
    this.sqFtUsed = sqFtUsed;
    this.sqFtReceiving = sqFtReceiving;
    this.tilesSelected = (sqFtUsed / 4) || null;
    this.updateTilesArr();
  }

  updateTilesArr() {
    const data = this.order.data;
    const tilesArr = {};
    data.map(row => {
      const rowStr = JSON.stringify(row);
      const newRow: TileRow = JSON.parse(rowStr);
      const newObj = <TileRow>{};
      newObj.purchased = newRow.purchased;
      newObj.image = newRow.image;
      newObj.used = newRow.used;
      newObj.material = newRow.material;
      newObj.tile = newRow.tile;
      const objectKey = `${newObj.material}-${newObj.tile}`;
      if (!tilesArr[objectKey]) {
        tilesArr[objectKey] = newObj;
      } else { // if tiles are already selected just add to the totals
        tilesArr[objectKey].purchased += newObj.purchased;
        tilesArr[objectKey].used += newObj.used;
      }
    })
    this.getRowEstimate(tilesArr); // updates feature.ts with the totals
    this.feature.tiles = tilesArr;
  }

  getTileSqFt(tile) {
    return (tile === '48') ? 8 : 4;
  }

  requestQuote() {
    if (!this.user.isLoggedIn()) {
      this.tryingRequestQuote = true;
      this.loginDialog();
      return;
    }
    this.quoteDialogRef = this.dialog.open(QuoteDialogComponent, new MatDialogConfig);
  }

  viewDetails() {
    console.log('view details invoked');
  }

  calcSqFootage() {
    this.tilesNeeded = this.sqFootage / 4;
  }

  public saveQuantity() {
    this.saveQtyDialogRef = this.dialog.open(SaveDesignComponent, new MatDialogConfig);
    if (!this.user.isLoggedIn()) {
      this.loginDialog();
    }
  }

  public loginDialog(load: boolean = false) {
    this.debug.log('design-component', 'displaying login dialog');
    const config = new MatDialogConfig();
    config.disableClose = true;
    this.loginDialogRef = this.dialog.open(LoginComponent, config);
    this.loginDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result === 'cancel') {
          this.tryingRequestQuote = false;
          // we need to close the savedDialog too if it's open.
          if (this.saveQtyDialogRef) { this.saveQtyDialogRef.close(); return; }
        } else if (load) {
          // the user should be logged in now, so show the load dialog
          this.loadQtyDesigns();
        }
        if (this.tryingRequestQuote) {
          this.tryingRequestQuote = false;
          this.requestQuote()
        }
      });
  }

  public loadQtyDesigns() {
    // If the user is not logged in then present the login dialog
    if (!this.user.isLoggedIn()) {
      this.loginDialog(true);
    } else {
      // let loadDialog: MatDialog;
      this.api.getMyDesigns()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(designs => {
        this.loadQtyDialogRef = this.dialog.open(LoadDesignComponent, new MatDialogConfig);
        this.loadQtyDialogRef.componentInstance.designs = designs;
      });
    }
  }

}


export class TableDataSource extends MatTableDataSource<any> {

  constructor(private subject: BehaviorSubject<Order[]>) {
    super ();
  }

}

export interface Order {
  material: any;
  qty: number;
  size: string;
  type: string;
}

export interface TileRow {
  purchased: number;
  image: string;
  used: number;
  material: string;
  tile: string;
}
