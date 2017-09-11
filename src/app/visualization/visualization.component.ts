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
    this.debug.log('visualization-component', JSON.stringify(this.feature.getUserInputs()));
    this.tiling.QT.SetUserDataPropertiesJSONString(JSON.stringify(this.feature.getUserInputs()));
    this.tiling.QT.UpdateFeature();
    var boxes = this.tiling.QT.GetBoxes();
    this.vis.QT.Visualization.SetFeatureType(this.tiling.QT.Properties.UserInputs.Type);
    this.vis.QT.Visualization.visualizeTiles(
      this.tiling.QT.Properties.UserInputs.NumX,
      this.tiling.QT.Properties.UserInputs.NumY,
      boxes,
      this.tiling.QT.Properties.UserInputs.Tiles,
      50
    );
  }

}
