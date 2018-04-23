import { MaterialsService } from 'app/_services/materials.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClarioGridsService {
  gridOptions = this.materials.clario_grids;
  selectedGrid: any;

  constructor(
    public materials: MaterialsService
  ) { }

}
