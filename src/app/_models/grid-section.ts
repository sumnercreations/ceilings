import { Injectable } from '@angular/core';

@Injectable()
export class GridSection {
  backgroundImage: string;
  rotation: number;
  material: string;
  tile: string;
  row: number;
  column: number;

  constructor(
    row: number,
    column: number,
    backgroundImage: string = '',
    rotation: number = 0,
    material: string = '',
    tile: string = '',
  ) {
    this.setBackgroundImage(backgroundImage);
    this.setRotation(rotation);
    this.setMaterial(material);
    this.setTile(tile);
    this.setRow(row);
    this.setColumn(column);
  }

  //               __  __
  //    ________  / /_/ /____  __________
  //   / ___/ _ \/ __/ __/ _ \/ ___/ ___/
  //  (__  )  __/ /_/ /_/  __/ /  (__  )
  // /____/\___/\__/\__/\___/_/  /____/

  setBackgroundImage(url: string) {
    this.backgroundImage = url;
  }

  setRotation(value: number) {
    this.rotation = value;
  }

  setMaterial(material: string) {
    this.material = material;
  }

  setTile(type: string) {
    this.tile = type;
  }

  setRow(row: number) {
    this.row = row;
  }

  setColumn(column: number) {
    this.column = column;
  }

  //                __  __
  //    ____ ____  / /_/ /____  __________
  //   / __ `/ _ \/ __/ __/ _ \/ ___/ ___/
  //  / /_/ /  __/ /_/ /_/  __/ /  (__  )
  //  \__, /\___/\__/\__/\___/_/  /____/
  // /____/

  getBackgroundImage() {
    return this.backgroundImage;
  }

  getRotation() {
    return this.rotation;
  }

  getMaterial() {
    return this.material;
  }

  getTile() {
    return this.tile;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }
}
