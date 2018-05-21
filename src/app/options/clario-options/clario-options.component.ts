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
    // see https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    setTimeout(() => {
      this.gridSizeChanged(this.feature.grid_type);
    });
  }

  gridSizeChanged(selection) {
    this.clarioGrids.gridSizeSelected(selection);
  }

  tileSizeChanged(selection) {
    this.clarioGrids.tileSizeSelected(selection);
  }
}
