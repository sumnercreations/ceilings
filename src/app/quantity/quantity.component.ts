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
  sqFootage: number;
  tilesNeeded: number;
  estimatedPrice = 0;
  tilesUsed = 0;
  tilesReceiving = 0;
  tilesRemaining: number;
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
          console.log(qtyOrder);
          if (qtyOrder.is_quantitiy_order === false) { this.router.navigate([`${qtyOrder.feature_type}/design`, qtyOrder.id]); }
          const tilesObj = JSON.parse(qtyOrder.tiles);
          const rowsToAdd = Object.keys(tilesObj).map(key => tilesObj[key]);
          console.log('rowsToAdd:', rowsToAdd);
          rowsToAdd.map(row => {
            const newRow = {[`${row.material}-${row.tile}`]: row };
            this.doAddRow(newRow);
          });
          this.updateSummary();
        })
      }
    })
    this.dataSource = new TableDataSource(this.dataSubject);
    this.dataSource.connect();
    this.feature.tile_size = 48; // for quantity messaging
    this.feature.is_quantitiy_order = true;

    this.api.onUserLoggedIn
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        const user = this.api.user;
        this.user.uid = user.uid;
        this.user.email = user.email;
        this.user.firstname = user.firstname;
        this.user.lastname = user.lastname;
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

  print() {
    window.print();
  }

  addToOrder() {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent);
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (!!result) { this.doAddRow(result); }
      })
  }

  doAddRow(row) {
    console.log(row);
    this.debug.log('quantity', row);
    this.getRowEstimate(row); // sets feature.estimated_amount
    const newRow = row[Object.keys(row)[0]];
    newRow.total = this.feature.estimated_amount;
    newRow.tileSqFt = this.getTileSqFt(newRow.tile);
    this.order.data.push(newRow);
    this.order.data = this.order.data.slice(); // refreshes the table
    this.updateSummary();
  }

  editRow(index, row) {
    console.log('edit index/row:', index, row);
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
    console.log('edit result:', row);
    this.getRowEstimate(row); // sets feature.estimated_amount
    const editRow = row[Object.keys(row)[0]];
    editRow.total = this.feature.estimated_amount;
    editRow.tileSqFt = this.getTileSqFt(editRow.tile);
    this.order.data[index] = editRow;
    this.order.data = this.order.data.slice(); // refreshes the table
    this.updateSummary();
  }

  deleteRow(index, row) {
    console.log('delete index/row:', index, row);
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
      case 'tetria': this.feature.getTetriaEstimate(row); break; // TODO FIX THIS
      case 'clario': this.feature.getClarioEstimate(row); break; // TODO FIX THIS
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
    this.tilesReceiving = tilesReceiving;
    this.tilesUsed = tilesUsed;
    this.sqFtUsed = sqFtUsed;
    this.sqFtReceiving = sqFtReceiving;
    this.tilesRemaining = (this.tilesUsed - this.tilesNeeded) || null;
    this.updateTilesArr();
  }

  updateTilesArr() {
    const data = this.order.data;
    const tilesArr = {};
    data.map(row => {
      const newObj = <TileRow>{};
      newObj.purchased = row.purchased;
      newObj.image = row.image;
      newObj.used = row.used;
      newObj.material = row.material;
      newObj.tile = row.tile;
      const objectKey = `${newObj.material}-${newObj.tile}`;
      if (!tilesArr[objectKey]) {
        tilesArr[objectKey] = newObj;
      } else { // if tiles are already selected just add to the totals
        tilesArr[objectKey].purchased += newObj.purchased;
        tilesArr[objectKey].used += newObj.used;
      }
    })
    this.feature.tiles = tilesArr;
    console.log(this.feature.tiles);
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
    console.log('Request Quote Invoked');
  }

  viewDetails() {
    console.log('view details invoked');
  }

  calcSqFootage() {
    this.tilesNeeded = this.sqFootage / 4; // TODO: toggle between 2 and 4
  }

  public saveQuantity() {
    // let saveDialog: MatDialog;
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
