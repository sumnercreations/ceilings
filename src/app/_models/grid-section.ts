import { Injectable } from '@angular/core';

@Injectable()
export class GridSection {
  row: number;
  column: number;
  backgroundImage: string;
  texture: string;
  rotation: number;
  material: string;
  tile: string;
  tileSize: string;

  constructor(
    _row: number,
    _column: number,
    _backgroundImage: string = '',
    _texture: string = '',
    _rotation: number = 0,
    _material: string = '',
    _tile: string = '',
    _tileSize: string = ''
  ) {
    this.setBackgroundImage(_backgroundImage);
    this.setTexture(_texture),
    this.setRotation(_rotation);
    this.setMaterial(_material);
    this.setTile(_tile);
    this.setRow(_row);
    this.setColumn(_column);
    this.setTileSize(_tileSize);
  }

  //               __  __
  //    ________  / /_/ /____  __________
  //   / ___/ _ \/ __/ __/ _ \/ ___/ ___/
  //  (__  )  __/ /_/ /_/  __/ /  (__  )
  // /____/\___/\__/\__/\___/_/  /____/

  setBackgroundImage(url: string) {
    this.backgroundImage = url;
  }

  setTexture(texture: string) {
    this.texture = texture;
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

  setTileSize(size: string) {
    this.tileSize = size;
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
