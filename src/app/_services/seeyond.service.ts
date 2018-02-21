import { DebugService } from './debug.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { SeeyondFeature } from 'app/seeyond-feature';
import { User } from './../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SeeyondService {
  onSaved = new EventEmitter();
  onLoaded = new EventEmitter();
  apiUrl = 'https://' + environment.API_URL + '/seeyonds/';

  constructor(
    private http: Http,
    private seeyond: SeeyondFeature,
    private user: User,
    private debug: DebugService
  ) {}

  getMyFeatures() {
    return this.http.get(this.apiUrl + 'list/' + this.user.uid)
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  loadFeature(id: number) {
    this.debug.log('seeyond', 'Loading Feature');
    return this.http.get(this.apiUrl + id)
      .map((res: Response) => {
        this.debug.log('seeyond', res.json());
        this.onLoaded.emit();
        this.debug.log('seeyond', 'emitting onLoaded');
        return res.json();
      })
      .catch(this.handleError);
  }

  updateFeature() {
    this.debug.log('seeyond', this.seeyond.hardware);
    const hardware = JSON.stringify({hardware: this.seeyond.hardware});
    this.debug.log('seeyond', hardware)
    const patchData = {
      'id': this.seeyond.id,
      'uid': this.user.uid,
      'feature_type': this.seeyond.feature_type,
      'title': this.seeyond.title,
      'name': this.seeyond.name,
      'design_name': this.seeyond.design_name,
      'project_name': this.seeyond.project_name,
      'specifier': this.seeyond.specifier,
      'units': this.seeyond.units,
      'width': this.seeyond.width,
      'height': this.seeyond.height,
      'radius': this.seeyond.radius,
      'angle': this.seeyond.angle,
      'ceiling_length': this.seeyond.ceiling_length,
      'depth': this.seeyond.depth,
      'tessellation': this.seeyond.tessellation,
      'pattern_strength': this.seeyond.pattern_strength,
      'material': this.seeyond.material,
      'sheet_part_id': this.seeyond.sheet_part_id,
      'boxsize': this.seeyond.boxsize,
      'boxes': this.seeyond.boxes,
      'sheets': this.seeyond.sheets,
      'xml': this.seeyond.xml,
      'cove_lighting': this.seeyond.cove_lighting,
      'random_seed': this.seeyond.random_seed,
      'services_amount': this.seeyond.services_amount,
      'estimated_amount': this.seeyond.estimated_amount,
      'quoted': this.seeyond.quoted,
      'archived': this.seeyond.archived,
      'hardware': this.seeyond.hardware
    };
    this.debug.log('seeyond', patchData);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(this.apiUrl + this.seeyond.id, patchData, options)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('seeyond', 'emitting onSaved');
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  saveFeature() {
    const patchData = {
      'uid': this.user.uid,
      'feature_type': this.seeyond.seeyond_feature_type,
      'title': this.seeyond.title,
      'name': this.seeyond.name,
      'design_name': this.seeyond.design_name,
      'project_name': this.seeyond.project_name,
      'specifier': this.seeyond.specifier,
      'units': this.seeyond.units,
      'width': this.seeyond.width,
      'height': this.seeyond.height,
      'radius': this.seeyond.radius,
      'angle': this.seeyond.angle,
      'ceiling_length': this.seeyond.ceiling_length,
      'depth': this.seeyond.depth,
      'tessellation': this.seeyond.tessellation,
      'pattern_strength': this.seeyond.pattern_strength,
      'material': this.seeyond.material,
      'sheet_part_id': this.seeyond.sheet_part_id,
      'boxsize': this.seeyond.boxsize,
      'boxes': this.seeyond.boxes,
      'sheets': this.seeyond.sheets,
      'xml': this.seeyond.xml,
      'cove_lighting': this.seeyond.cove_lighting,
      'random_seed': this.seeyond.random_seed,
      'services_amount': this.seeyond.services_amount,
      'estimated_amount': this.seeyond.estimated_amount,
      'quoted': this.seeyond.quoted,
      'archived': this.seeyond.archived,
      'hardware': this.seeyond.hardware
    };

    return this.http.post(this.apiUrl, patchData)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('seeyond', 'emitting onSaved');
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  deleteFeature(id: number) {
    return this.http.delete(this.apiUrl + id)
  }

  sendEmail() {
    return this.http.get(this.apiUrl + 'email/' + this.user.uid + '/feature/' + this.seeyond.id)
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  getPrices() {
    return this.http.get(this.apiUrl + 'prices')
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  private handleError(error: any) {
    const errorJson = error.json();
    if (errorJson) {
      return Observable.throw(errorJson.message || 'Server Error');
    }

    return Observable.throw('Unknown Error');
  }


}
