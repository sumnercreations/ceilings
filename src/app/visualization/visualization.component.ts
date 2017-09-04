import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import * as visualization from 'syd-visualization';
import * as tiling from 'syd-tiling';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  private vis = visualization;
  private tiling = tiling;

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.debug.log('visualization-component', 'ngOnInit');
    this.debug.log('visualization-component', this.feature.gridData);
    this.tiling.QT.SetUserDataPropertiesJSONString(JSON.stringify(this.feature.getUserInputs()));
    this.tiling.QT.UpdateFeature();

    var boxes = this.tiling.QT.GetBoxes();
    this.debug.log('visualization-component', 'boxes: ' + boxes);
    this.vis.QT.Visualization.SetFeatureType(this.feature.getFeatureTypeInteger());
    this.vis.QT.Visualization.visualizeTiles(this.feature.getColumns(), this.feature.getRows(), boxes);
  }

}
