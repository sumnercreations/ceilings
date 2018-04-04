import { Injectable } from '@angular/core';

@Injectable()
export class QuantityService {
  feature_type: string;
  qtyTilesArray = <TileObj[]>[];

  constructor() { }

  pushToTilesArr(newObj) {
    this.qtyTilesArray.push(newObj);
  }

}

export interface TileObj {
  'purchased': number,
  'image': string,
  'used': number,
  'material': string,
  'tile': string
}
