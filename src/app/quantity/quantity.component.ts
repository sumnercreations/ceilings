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
      if (params['type'] === 'hush') { this.location.go(this.router.url.replace(/hush\/quantity/g, 'hush-blocks/quantity')); }
      this.qtySrv.feature_type = this.feature.setFeatureType(params['type']);
      this.materials = this.feature.getFeatureMaterials();
      this.setTableProperties();
    })
    this.dataSource = new TableDataSource(this.dataSubject);
    this.dataSource.connect();
    this.feature.tile_size = 48; // for quantity messaging
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setTableProperties() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        this.displayedColumns = ['ordered', 'material', 'total', 'edit'];
        this.headerTitle = 'Hush Blocks Tiles';
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
        if (!!result) {
          console.log(result);
          this.debug.log('quantity', result);
          this.getRowEstimate(result); // sets feature.estimated_amount
          const newRow = result[Object.keys(result)[0]];
          newRow.total = this.feature.estimated_amount;
          newRow.tileSqFt = this.getTileSqFt(newRow.tile);
          this.order.data.push(newRow);
          this.order.data = this.order.data.slice(); // refreshes the table
          this.updateSummary();
        }
      })
  }

  editRow(index, row) {
    console.log('edit index/row:', index, row);
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent, {data: row});
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (!!result) {
          console.log('edit result:', result);
          this.getRowEstimate(result); // sets feature.estimated_amount
          const editRow = result[Object.keys(result)[0]];
          editRow.total = this.feature.estimated_amount;
          editRow.tileSqFt = this.getTileSqFt(editRow.tile);
          this.order.data[index] = editRow;
          this.order.data = this.order.data.slice(); // refreshes the table
          this.updateSummary();
        }
      })
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
      sqFtUsed += (row.purchased * row.tileSqFt);
      sqFtReceiving  += (row.used * row.tileSqFt);
    });
    this.estimatedPrice = estTotal;
    this.tilesReceiving = tilesReceiving;
    this.tilesUsed = tilesUsed;
    this.sqFtUsed = sqFtUsed;
    this.sqFtReceiving = sqFtReceiving;
    this.tilesRemaining = (this.tilesUsed - this.tilesNeeded) || null;
  }

  getTileSqFt(tile) {
    return (tile === '48') ? 8 : 4;
  }

  requestQuote() {
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
        // we need to close the savedDialog too if it's open.
          if (this.saveQtyDialogRef) { this.saveQtyDialogRef.close() }
        }else if (load) {
          // the user should be logged in now, so show the load dialog
          this.loadQtyDesigns();
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

}

