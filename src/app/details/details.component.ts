import { SeeyondFeature } from 'app/_features/seeyond-feature';
import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DebugService } from './../_services/debug.service';
import { ApiService } from './../_services/api.service';
import { Feature } from '../_features/feature';
import { SeeyondService } from '../_services/seeyond.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public rep: any;
  public tilesArray: any;
  public tileArraySize: number;
  public design: any;
  public isSeeyond = false;
  public tessellationStr: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature,
    public location: Location,
    public seeyondApi: SeeyondService,
    public seeyond: SeeyondFeature,
    public alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['type'] === 'hush') {
        this.location.go(this.router.url.replace(/hush\/design/g, 'hush-blocks/design'));
      }
      const designId = parseInt(params['param1'], 10) || parseInt(params['param2'], 10);
      if (!!designId) {
        if (params['type'] === 'seeyond') {
          this.isSeeyond = true;
          this.seeyondApi.loadFeature(designId).subscribe(design => {
            if (!design.quoted) {
              // not quoted
              const pathname = window.location.pathname.replace(/\/details/g, '');
              this.router.navigate([pathname]);
            } else {
              this.design = design;
              this.tessellationStr = this.seeyond.getTessellationName(design.tessellation);
              this.debug.log('seeyond', design);
              // load the quoted design
              this.api.getUserRep(design.uid).subscribe(rep => {
                this.rep = rep;
              });
            }
          });
        } else {
          this.api.loadDesign(designId).subscribe(design => {
            if (design.is_quantity_order) {
              const newUrl = window.location.pathname.replace(/design/, 'quantity');
              this.router.navigate([newUrl]);
            }
            if (!design.quoted) {
              // not quoted
              this.alert.error('Details are not available until a request for a quote is processed.');
              this.router.navigate([design.feature_type, 'design', design.id]);
            } else {
              // load the quoted design
              this.api.getUserRep(design.uid).subscribe(rep => {
                this.rep = rep;
                this.feature.setDesign(design);
                this.tilesArray = this.feature.getTilesPurchasedObj();
                this.tileArraySize = Object.keys(this.tilesArray).length;
                this.debug.log('details-component', this.tileArraySize);
              });
            }
          });
        }
      }
    });
  }

  print() {
    window.print();
  }

  backToDesign() {
    const newUrl = window.location.pathname.replace(/details/, '');
    this.router.navigate([newUrl]);
  }
}
