import { ClarioGridsService } from './../../_services/clario-grids.service';
import { Component, OnInit } from '@angular/core';
import { OptionsComponent } from 'app/options/options.component';

@Component({
  selector: 'app-clario-options',
  templateUrl: './clario-options.component.html',
  styleUrls: ['../../options/options.component.css', './clario-options.component.css']
})
export class ClarioOptionsComponent extends OptionsComponent implements OnInit {

  ngOnInit() {
    if (!this.clarioGrids.selectedGrid) { this.clarioGrids.selectedGrid = this.setGridData('9/16\"')}
  }

  updateGridDimension(selection) {
    this.clarioGrids.selectedGrid = this.setGridData(selection);
    this.feature.units = this.clarioGrids.selectedGrid.units;
  }

  setGridData(selection) {
    const gridOptionsArr = Object.keys(this.materials.clario_grids).map(key => this.materials.clario_grids[key]);
    return gridOptionsArr.filter(key => key.name === selection)[0];
  }

}
