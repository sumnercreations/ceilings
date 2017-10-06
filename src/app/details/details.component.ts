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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debug: DebugService,
    private api: ApiService,
    public feature: Feature
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.api.loadDesign(params['id']).subscribe(design => {
          if(design == null) {
            // design not found
            this.router.navigate([params['type'], 'design']);
          }else if(!design.quoted) {
            // not quoted
            this.router.navigate([design.feature_type, 'design', design.id]);
          }else{
            // load the quoted design
            this.api.getUserRep(design.uid).subscribe(rep => {
              this.rep = rep;
              this.feature.setDesign(design);
              this.tilesArray = this.feature.getTilesPurchasedArray();
            });
          }
        });
      }
    });
  }

  print() {
    window.print();
  }

}
