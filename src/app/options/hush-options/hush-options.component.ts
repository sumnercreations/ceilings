import { Component, OnInit, Input } from '@angular/core';
import { OptionsComponent } from 'app/options/options.component';


@Component({
  selector: 'app-hush-options',
  templateUrl: './hush-options.component.html',
  styleUrls: ['../../options/options.component.css', './hush-options.component.css']
})
export class HushOptionsComponent extends OptionsComponent {
  @Input() modifyToolsArray = ['remove'];
  @Input() title = 'Hush Block Design Tool';


}
