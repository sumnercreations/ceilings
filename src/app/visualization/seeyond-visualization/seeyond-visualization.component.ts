import { Component, OnInit } from '@angular/core';
import { SeeyondFeature } from 'app/seeyond-feature';

@Component({
  selector: 'app-seeyond-visualization',
  templateUrl: './seeyond-visualization.component.html',
  styleUrls: ['./seeyond-visualization.component.css']
})
export class SeeyondVisualizationComponent implements OnInit {
  constructor(public seeyondFeature: SeeyondFeature) {}

  ngOnInit() {
    this.seeyondFeature.syd_v.QT.Visualization.SetCanvasSize(818, 523);
  }
}
