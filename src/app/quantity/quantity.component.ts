import { ClarioGridsService } from './../_services/clario-grids.service';
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
  materials: any;
  order: any;
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
  tryingRequestQuote = false;


  // Table Properties
  dataSource: TableDataSource | null;
  dataSubject = new BehaviorSubject<Order[]>([]);
  displayedColumns = ['used', 'receiving', 'unused', 'material', 'total', 'edit'];

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
    public user: User,
    public clarioGrids: ClarioGridsService,
  ) { }

  ngOnInit() {
    if (!this.clarioGrids.selectedGrid) { this.clarioGrids.setGridData('9/16\"'); }
    this.route.params.subscribe(params => {
      // initial setup
      if (params['type'] === 'hush') { this.location.go(this.router.url.replace(/hush\/quantity/g, 'hush-blocks/quantity')); }
      this.qtySrv.feature_type = this.feature.setFeatureType(params['type']);
      this.materials = this.feature.getFeatureMaterials();
      this.setComponentProperties();
      this.order = this.qtySrv.order;

      // load saved if included in params
      const qtyId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
      if (!!qtyId) {
        this.api.loadDesign(qtyId).subscribe(qtyOrder => {
          this.debug.log('quantity', `qtyOrder`);
          if (!qtyOrder.is_quantity_order) {
            this.router.navigate([`${qtyOrder.feature_type}/design`, qtyOrder.id]);
          }
          if (qtyOrder.feature_type !== this.qtySrv.feature_type) {
            this.location.go(`${qtyOrder.feature_type}/quantity/${qtyOrder.id}`);
          }
          this.qtySrv.order.data = [];
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
            this.qtySrv.doAddRow(newRow);
          });
        })
      }
    })

    this.dataSource = new TableDataSource(this.dataSubject);
    this.dataSource.connect();
    this.feature.is_quantity_order = true;

    this.api.onUserLoggedIn
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

  setComponentProperties() {
    switch (this.qtySrv.feature_type) {
      case 'hush':
        this.headerTitle = 'Hush Blocks Tiles';
        this.displayedColumns = ['hush-receiving', 'hush-material', 'total', 'edit'];
        break;
      case 'clario': this.headerTitle = 'Clario Tiles'; break;
      case 'tetria': this.headerTitle = 'Tetria Tiles'; break;
    }
  }

  backToDesign(reset?) {
    this.router.navigate([this.feature.feature_type, 'design']);
    if (reset === 'reset') { this.feature.reset(); }
  }

  addToOrder() {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent);
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(requestedRow => {
        if (!!requestedRow) {
          let isMultiple = false;
          const res = requestedRow[Object.keys(requestedRow)[0]];
          this.qtySrv.order.data.map(row => {
            const rowStr = JSON.stringify(row);
            const newRow: TileRow = JSON.parse(rowStr);
            if (newRow.image === res.image) {
              isMultiple = true;
              this.qtySrv.combineRows(row, requestedRow);
            }
          })
          if (!isMultiple) { this.qtySrv.doAddRow(requestedRow); }
        }
      })
  }

  editRow(index, row) {
    this.addQtyDialogRef = this.dialog.open(AddQuantityComponent, {data: row});
    this.addQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (!!result) {
          this.qtySrv.doEditRow(index, result);
          this.qtySrv.checkAndFixDuplicates();
        }
      })
  }

  deleteRow(index, row) {
    const removeRow = {index: index, row: row};
    this.removeQtyDialogRef = this.dialog.open(RemoveQuantityComponent, {data: removeRow});
    this.removeQtyDialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result === 'remove') {
          this.qtySrv.order.data.splice(index, 1);
        }
        this.qtySrv.order.data = this.qtySrv.order.data.slice();
        this.qtySrv.updateSummary();
      })
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
    let path = window.location.pathname;
    path = `${path}/details`
    this.router.navigate([path])
  }

  calcSqFootage() {
    this.tilesNeeded = Math.ceil(this.sqFootage / 4);
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
