import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { ApiService } from './../_services/api.service';
import { DebugService } from './../_services/debug.service';
import { Feature } from '../feature';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  feature_type: string;
  materials: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature,
    private alert: AlertService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feature_type = this.feature.setFeatureType(params['type']);
      if (params['type'] === 'hush') { this.location.go(this.router.url.replace(/hush\/quantity/g, 'hush-blocks/quantity')); }
      this.materials = this.feature.getFeatureMaterials();
    })
  }

  backToDesign() {
    this.router.navigate([this.feature.feature_type, 'design', this.feature.id]);
  }

  print() {
    window.print();
  }
}
