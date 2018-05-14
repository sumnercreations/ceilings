import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DebugService } from './../_services/debug.service';
import { AlertService } from './../_services/alert.service';
import { Feature } from '../feature';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private alert: AlertService,
    public feature: Feature
  ) {}

  ngOnInit() {
    this.feature.reset();
  }

  public goTo(where: string, segment) {
    const subComponent = !!segment ? segment : 'design';
    this.router.navigate([`/${where}/${subComponent}`]);
  }
}
