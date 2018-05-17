import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { MaterialsService } from './materials.service';
import { DebugService } from './debug.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
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
    public debug: DebugService,
    private materials: MaterialsService,
    private api: ApiService,
    private alert: AlertService
  ) {}

  getMyFeatures() {
    return this.http
      .get(this.apiUrl + 'list/' + this.user.uid)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  loadFeature(id: number) {
    this.debug.log('seeyond', 'Loading Feature');
    return this.http
      .get(this.apiUrl + id)
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
    const hardware = JSON.stringify({ hardware: this.seeyond.hardware });
    const profileImg = this.seeyond.seeyondProfileImage();
    this.replaceOldPartIds();
    this.debug.log('seeyond', hardware);
    const patchData = {
      id: this.seeyond.id,
      uid: this.user.uid,
      feature_type: this.seeyond.seeyond_feature_index,
      title: this.seeyond.title,
      name: this.seeyond.name,
      design_name: this.seeyond.design_name,
      project_name: this.seeyond.project_name,
      specifier: this.seeyond.specifier,
      units: this.seeyond.units,
      width: this.seeyond.width,
      height: this.seeyond.height,
      radius: this.seeyond.radius,
      angle: this.seeyond.angle,
      ceiling_length: this.seeyond.ceiling_length,
      depth: this.seeyond.depth,
      tessellation: this.seeyond.tessellation,
      pattern_strength: this.seeyond.pattern_strength,
      material: this.seeyond.material,
      sheet_part_id: this.seeyond.sheet_part_id,
      boxsize: this.seeyond.boxsize,
      boxes: this.seeyond.boxes,
      sheets: this.seeyond.sheets,
      xml: this.seeyond.xml,
      cove_lighting: this.seeyond.cove_lighting,
      random_seed: this.seeyond.random_seed,
      services_amount: this.seeyond.services_amount,
      estimated_amount: this.seeyond.estimated_amount,
      quoted: this.seeyond.quoted,
      archived: this.seeyond.archived,
      hardware: this.seeyond.hardware,
      linear_feet: this.seeyond.linear_feet,
      design_data_url: profileImg,
      quantity: this.seeyond.quantity
    };
    this.debug.log('seeyond', patchData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .patch(this.apiUrl + this.seeyond.id, patchData, options)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('seeyond', 'emitting onSaved');
        return res.json() || {};
      })
      .catch(this.handleError);
  }

  saveFeature() {
    const profileImg = this.seeyond.seeyondProfileImage();
    this.replaceOldPartIds();
    const patchData = {
      uid: this.user.uid,
      feature_type: this.seeyond.seeyond_feature_index,
      title: this.seeyond.title,
      name: this.seeyond.name,
      design_name: this.seeyond.design_name,
      project_name: this.seeyond.project_name,
      specifier: this.seeyond.specifier,
      units: this.seeyond.units,
      width: this.seeyond.width,
      height: this.seeyond.height,
      radius: this.seeyond.radius,
      angle: this.seeyond.angle,
      ceiling_length: this.seeyond.ceiling_length,
      depth: this.seeyond.depth,
      tessellation: this.seeyond.tessellation,
      pattern_strength: this.seeyond.pattern_strength,
      material: this.seeyond.material,
      sheet_part_id: this.seeyond.sheet_part_id,
      boxsize: this.seeyond.boxsize,
      boxes: this.seeyond.boxes,
      sheets: this.seeyond.sheets,
      xml: this.seeyond.xml,
      cove_lighting: this.seeyond.cove_lighting,
      random_seed: this.seeyond.random_seed,
      services_amount: this.seeyond.services_amount,
      estimated_amount: this.seeyond.estimated_amount,
      quoted: this.seeyond.quoted,
      archived: this.seeyond.archived,
      hardware: this.seeyond.hardware,
      linear_feet: this.seeyond.linear_feet,
      design_data_url: this.seeyond.design_data_url,
      quantity: this.seeyond.quantity
    };

    return this.http
      .post(this.apiUrl, patchData)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('seeyond', 'emitting onSaved');
        return res.json() || {};
      })
      .catch(this.handleError);
  }

  deleteFeature(id: number) {
    return this.http.delete(this.apiUrl + id);
  }

  sendEmail() {
    return this.http
      .get(this.apiUrl + 'email/' + this.user.uid + '/feature/' + this.seeyond.id)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getPrices() {
    return this.http
      .get(this.apiUrl + 'prices')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private replaceOldPartIds() {
    const partId = this.seeyond.sheet_part_id;
    const replacementsArray = this.materials.parts_substitutes;
    if (!!replacementsArray) {
      replacementsArray.map(obj => {
        const today = this.formattedTimeStamp();
        const todayFmt = new Date(Number(today[0]), Number(today[1]), Number(today[2]));
        const effectiveArr = !!obj.effectiveDate ? obj.effectiveDate.split('-') : [];
        const effectiveDate = new Date(Number(effectiveArr[0]), Number(effectiveArr[1]), Number(effectiveArr[2]));
        const isEffective = effectiveDate.getTime() <= todayFmt.getTime();
        if (obj.partId === partId && isEffective) {
          this.debug.log('seeyond', `replacing sheet_part_id ${this.seeyond.sheet_part_id} with ${partId}`);
          this.seeyond.sheet_part_id = obj.replacementPartId;
        }
      });
    }
  }

  formattedTimeStamp() {
    // returns today in [yyyy, mm, dd];
    const d = new Date();
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day];
  }

  public handleError(error: HttpErrorResponse) {
    // console.log(error);
    if (error.status === 500) {
      this.debug.log('api', error.message);
      return;
    }
    // if (!!error.error.result.message) { this.alert.error(error.error.result.message); }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.debug.log('api', `An error occurred: ${error.statusText}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.debug.log('api', `Backend returned code ${error.status}, body was: ${error.message}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable('Something bad happened; please try again later.');
  }
}
