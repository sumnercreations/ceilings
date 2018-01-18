import { OptionsComponent } from 'app/options/options.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-velo-options',
  templateUrl: './velo-options.component.html',
  styleUrls: ['../../options/options.component.css', './velo-options.component.css']
})
export class VeloOptionsComponent extends OptionsComponent {
  modifyToolsArray = ['remove'];

}
