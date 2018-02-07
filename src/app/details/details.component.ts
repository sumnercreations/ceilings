import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DebugService } from './../_services/debug.service';
import { ApiService } from './../_services/api.service';
import { Feature } from '../feature';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public rep: any;
  public tilesArray: any;
  public tileArraySize: number;
  public encodedImage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('details onInit params:', params);
      const designId = ((parseInt(params['param1'], 10)) || (parseInt(params['param2'], 10)));
      console.log('design id:', designId);
      if (!!designId) {
        this.api.loadDesign(designId).subscribe(design => {
          if (design == null) {
            // design not found
            this.router.navigate([params['type'], 'design']);
          }else if (!design.quoted) {
            // not quoted
            this.router.navigate([design.feature_type, 'design', design.id]);
          } else {
            // load the quoted design
            this.api.getUserRep(design.uid).subscribe(rep => {
              this.rep = rep;
              this.feature.setDesign(design);
              this.tilesArray = this.feature.getTilesPurchasedArray();
              this.tileArraySize = Object.keys(this.tilesArray).length;
              this.debug.log('details-component', this.tileArraySize);
            });
          }
        });
      }
    });
  }

  print() {
    window.print();
  }

  backToDesign() {
    this.router.navigate([this.feature.feature_type, 'design', this.feature.id]);
  }

}
