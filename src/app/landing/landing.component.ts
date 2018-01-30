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
  ) { }

  ngOnInit() {
    this.feature.reset();
  }

  public goTo(where: string) {
    this.debug.log('landing-component', where);
    switch (where) {
      case 'seeyond':
        // window.location.href = 'https://seeyond.3-form.com/feature/ceiling';
        this.router.navigate(['/seeyond/']);
        break;

      case 'tetria':
        this.router.navigate(['/tetria/']);
        break;

      case 'clario':
        this.router.navigate(['/clario/']);
        break;

      case 'velo':
        this.router.navigate(['/velo/']);
        break;

      case 'hush-block':
        this.router.navigate(['/hush-block/']);
        break;

      default:
        this.alert.error('Sorry we don\'t recognize the path: \'' + where + '\'');
        break;
    }
  }

}
