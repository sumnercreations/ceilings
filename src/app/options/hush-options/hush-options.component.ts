import { Component, OnInit, Input, Output } from '@angular/core';
import { OptionsComponent } from 'app/options/options.component';


@Component({
  selector: 'app-hush-options',
  templateUrl: './hush-options.component.html',
  styleUrls: ['../../options/options.component.css', './hush-options.component.css']
})
export class HushOptionsComponent extends OptionsComponent implements OnInit {
  modifyToolsArray = ['remove'];
  title = 'Hush Block Design Tool';

}
