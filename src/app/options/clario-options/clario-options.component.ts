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
    if (!this.clarioGrids.selectedGrid) { this.clarioGrids.gridSizeSelected('15/16'); }
  }

  gridSizeChanged(selection) {
    this.clarioGrids.gridSizeSelected(selection);
  }

  tileSizeChanged(selection) {
    this.clarioGrids.tileSizeSelected(selection);
  }
}
