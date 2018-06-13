import { Component, OnInit } from '@angular/core';
import { OptionsComponent } from 'app/options/options.component';

@Component({
  selector: 'app-swoon-options',
  templateUrl: './swoon-options.component.html',
  styleUrls: ['../../options/options.component.css', './swoon-options.component.css']
})
export class SwoonOptionsComponent extends OptionsComponent {
  ngOnInit() {
    setTimeout(() => {
      if (!this.feature.quoted) {
        this.feature.width = this.feature.units === 'inches' ? 384 : 976;
        this.feature.length = this.feature.units === 'inches' ? 240 : 610;
      }
    }, 500);
  }
}
