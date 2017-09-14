import { Component, OnInit } from '@angular/core';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import * as visualization from 'syd-visualization';
import * as tiling from 'syd-tiling';
import * as jszip from 'jszip';
// import * as filesaver from 'file-saver';

var packageJSON = require('../../../package.json');

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  private vis = visualization;
  private tiling = tiling;
  // private filesaver = filesaver;
  private appVersion = '';
  private tilingVersion = '';
  private visualizationVersion = '';

  constructor(
    private debug: DebugService,
    public feature: Feature
  ) { }

  ngOnInit() {
    // log the versions for future debugging purposes
    this.appVersion = packageJSON.version;
    this.tilingVersion = packageJSON.dependencies['syd-tiling'];
    this.visualizationVersion = packageJSON.dependencies['syd-visualization'];
    this.debug.log('visualization-component', "Ceilings: " + this.appVersion);
    this.debug.log('visualization-component', "Syd-Tiling: " + this.tilingVersion);
    this.debug.log('visualization-component', "Syd-Visualization: " + this.visualizationVersion);
    this.debug.log('visualization-component', 'Show Guide: ' + this.feature.showGuide);
    this.debug.log('visualization-component', JSON.stringify(this.feature.getUserInputs()));

    this.tiling.QT.SetUserDataPropertiesJSONString(JSON.stringify(this.feature.getUserInputs()));
    this.tiling.QT.UpdateFeature();
    var boxes = this.tiling.QT.GetBoxes();
    this.vis.QT.Visualization.SetFeatureType(this.tiling.QT.Properties.UserInputs.Type);
    // this.vis.QT.Visualization.showGuide(this.feature.showGuide);
    this.vis.QT.Visualization.visualizeTiles(
      this.tiling.QT.Properties.UserInputs.NumX,
      this.tiling.QT.Properties.UserInputs.NumY,
      boxes,
      this.tiling.QT.Properties.UserInputs.Tiles,
      50
    );
  }

  // downloadImages() {
  //   var profile = this.feature.syd_v.QT.Visualization.TakeSnapshot(45);
  //   var facing  = this.feature.syd_v.QT.Visualization.TakeSnapshot(0);
  //   var filename = this.feature.name + ".zip";
  //   var FileSaver = require('file-saver');
  //   var JSZip = require("jszip");
  //   var zip = new JSZip();

  //   profile = profile.replace(/^data:image\/(png|jpg);base64,/, '');
  //   facing = facing.replace(/^data:image\/(png|jpg);base64,/, '');
  //   zip.file("profile.png", profile, {base64: true});
  //   zip.file("facing.png", facing, {base64: true});
  //   zip.generateAsync({type:"blob"})
  //   .then(function (blob) {
  //       FileSaver.saveAs(blob, filename);
  //   });
  // }

  takeScreenshot() {
    this.debug.log('visualization-component', 'taking a screenshot');
    var profile = this.vis.QT.Visualization.TakeSnapshot(45);
    var facing  = this.vis.QT.Visualization.TakeSnapshot(0);
    var filename = this.feature.feature_type + ".zip";
    var zip = new jszip();
    var FileSaver = require('file-saver');

    profile = profile.replace(/^data:image\/(png|jpg);base64,/, '');
    facing = facing.replace(/^data:image\/(png|jpg);base64,/, '');
    zip.file("profile.png", profile, {base64: true});
    zip.file("facing.png", facing, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function (blob) {
        FileSaver.saveAs(blob, filename);
    });
  }

}
