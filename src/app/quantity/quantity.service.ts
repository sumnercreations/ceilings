import { MatTableDataSource } from '@angular/material';
import { TileRow } from './quantity.component';
import { Feature } from './../feature';
import { DebugService } from './../_services/debug.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class QuantityService {
  feature_type: string;
  qtyTilesArray = <TileObj[]>[];
  estimatedPrice = 0;
  tilesSelected: number;
  sqFtUsed = 0;
  sqFtReceiving = 0;
  sqFtPerTile: number;
  order = new MatTableDataSource();

  constructor(
    private debug: DebugService,
    public feature: Feature,
    private route: ActivatedRoute
  ) {}

  setRowData(row) {
    this.debug.log('quantity', row);
    this.getRowEstimate(row); // sets feature.estimated_amount
    const newRow = row[Object.keys(row)[0]];
    this.feature.material = newRow.material;
    this.feature.tile_size = (newRow.tile === '48') ? 48 : 24;
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

  combineRows(requestedRow, matchedRow) {
    const pkgQty = this.feature.getPackageQty(matchedRow.tile);
    const requestedRowFmtd = this.setRowData(requestedRow);
    matchedRow.used += requestedRowFmtd.used;
    matchedRow.total += requestedRowFmtd.total;
    matchedRow.purchased = pkgQty * Math.ceil(matchedRow.used / pkgQty);
    this.updateSummary();
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

  getRowEstimate(row) {
    switch (this.feature_type) {
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
}

export interface TileObj {
  'purchased': number,
  'image': string,
  'used': number,
  'material': string,
  'tile': string
}
