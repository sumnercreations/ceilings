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
    private seeyondFeature: SeeyondFeature,
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
    this.debug.log('seeyond', this.seeyondFeature.hardware);
    const hardware = JSON.stringify({hardware: this.seeyondFeature.hardware});
    this.debug.log('seeyond', hardware)
    const patchData = {
      'id': this.seeyondFeature.id,
      'uid': this.user.uid,
      'feature_type': this.seeyondFeature.feature_type,
      'title': this.seeyondFeature.title,
      'name': this.seeyondFeature.name,
      'design_name': this.seeyondFeature.design_name,
      'project_name': this.seeyondFeature.project_name,
      'specifier': this.seeyondFeature.specifier,
      'units': this.seeyondFeature.units,
      'width': this.seeyondFeature.width,
      'height': this.seeyondFeature.height,
      'radius': this.seeyondFeature.radius,
      'angle': this.seeyondFeature.angle,
      'ceiling_length': this.seeyondFeature.ceiling_length,
      'depth': this.seeyondFeature.depth,
      'tessellation': this.seeyondFeature.tessellation,
      'pattern_strength': this.seeyondFeature.pattern_strength,
      'material': this.seeyondFeature.material,
      'sheet_part_id': this.seeyondFeature.sheet_part_id,
      'boxsize': this.seeyondFeature.boxsize,
      'boxes': this.seeyondFeature.boxes,
      'sheets': this.seeyondFeature.sheets,
      'xml': this.seeyondFeature.xml,
      'cove_lighting': this.seeyondFeature.cove_lighting,
      'random_seed': this.seeyondFeature.random_seed,
      'services_amount': this.seeyondFeature.services_amount,
      'estimated_amount': this.seeyondFeature.estimated_amount,
      'quoted': this.seeyondFeature.quoted,
      'archived': this.seeyondFeature.archived,
      'hardware': this.seeyondFeature.hardware
    };
    this.debug.log('seeyond', patchData);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(this.apiUrl + this.seeyondFeature.id, patchData, options)
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
      'feature_type': this.seeyondFeature.feature_type,
      'title': this.seeyondFeature.title,
      'name': this.seeyondFeature.name,
      'design_name': this.seeyondFeature.design_name,
      'project_name': this.seeyondFeature.project_name,
      'specifier': this.seeyondFeature.specifier,
      'units': this.seeyondFeature.units,
      'width': this.seeyondFeature.width,
      'height': this.seeyondFeature.height,
      'radius': this.seeyondFeature.radius,
      'angle': this.seeyondFeature.angle,
      'ceiling_length': this.seeyondFeature.ceiling_length,
      'depth': this.seeyondFeature.depth,
      'tessellation': this.seeyondFeature.tessellation,
      'pattern_strength': this.seeyondFeature.pattern_strength,
      'material': this.seeyondFeature.material,
      'sheet_part_id': this.seeyondFeature.sheet_part_id,
      'boxsize': this.seeyondFeature.boxsize,
      'boxes': this.seeyondFeature.boxes,
      'sheets': this.seeyondFeature.sheets,
      'xml': this.seeyondFeature.xml,
      'cove_lighting': this.seeyondFeature.cove_lighting,
      'random_seed': this.seeyondFeature.random_seed,
      'services_amount': this.seeyondFeature.services_amount,
      'estimated_amount': this.seeyondFeature.estimated_amount,
      'quoted': this.seeyondFeature.quoted,
      'archived': this.seeyondFeature.archived,
      'hardware': this.seeyondFeature.hardware
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
    return this.http.get(this.apiUrl + 'email/' + this.user.uid + '/feature/' + this.seeyondFeature.id)
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
