import { Component, OnInit, Input, Output } from '@angular/core';
import { OptionsComponent } from 'app/options/options.component';

@Component({
  selector: 'app-hush-options',
  templateUrl: './hush-options.component.html',
  styleUrls: ['../../options/options.component.css', './hush-options.component.css']
})
export class HushOptionsComponent extends OptionsComponent implements OnInit {
  modifyToolsArray = ['remove'];
  validateMessage: string;
  showMessage = false;
  timer: any;

  hushValidateOptions() {
    let isValid = false;
    if ((this.feature.length % 24 === 0)
      && (this.feature.length % 24 === 0)
      && (!!this.feature.design_name)) { isValid = true; }
    return isValid;
  }

  setValidateMessage() {
    let showMessage = false;
    const length = this.feature.length;
    const width = this.feature.width;
    const hasL = !!length;
    const hasW = !!width
    const validL = length % 24 === 0;
    const validW = width % 24 === 0;

    this.showMessage = (hasL || hasW) ? false : true;

    if (!validL && hasL) { showMessage = true; }
    if (!validW && hasW) { showMessage = true; }
    if (!validL && validW) { this.validateMessage = 'Height is not divisible by 24'; }
    if (validL && !validW) { this.validateMessage = 'Width is not divisible by 24'; }
    if (!validL && !validW) { this.validateMessage = 'Width and Height are not divisible by 24'; }
    return showMessage;
  }
}
