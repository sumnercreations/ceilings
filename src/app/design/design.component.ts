import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';

@Component({
  // selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  position = 'above';
  selectedTile = 'one';
  selectedColor = 1;
  colors = [1,2,3,4,5,6,7,8,9,10];

  constructor(
    private debug: DebugService
  ) { }

  ngOnInit() {
    this.debug.log('design-component', 'init');
  }

  public updateSelectedTile(tile: string) {
    this.selectedTile = tile;
  }

  public updateSelectedColor(color: number) {
    this.selectedColor = color;
  }

}
