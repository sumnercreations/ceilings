import { Feature } from 'app/_features/feature';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {
  constructor(public feature: Feature) {}

  ngOnInit() {}

  toggleSideNav() {
    this.feature.onToggleSideNav.emit();
  }
}
