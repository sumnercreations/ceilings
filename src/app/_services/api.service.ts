import { AlertService } from './alert.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { DebugService } from './../_services/debug.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  onSaved = new EventEmitter();
  onLoaded = new EventEmitter();
  onUserLoggedIn = new EventEmitter();
  apiUrl = 'https://' + environment.API_URL + '/ceilings/';
  loginUrl = 'https://' + environment.API_URL + '/auth/login';
  userUrl = 'https://' + environment.API_URL + '/users/';

  constructor(
    private http: Http,
    private feature: Feature,
    private user: User,
    private debug: DebugService,
    private alert: AlertService
  ) { }

  getMyDesigns() {
    return this.http.get(this.apiUrl + 'list/' + this.user.uid)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getUserRep(uid: number) {
    this.debug.log('api', 'getting user rep');
    return this.http.get(this.userUrl + uid + '/rep')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  loadDesign(id: number) {
    this.debug.log('api', 'loading design: ' + id);
    return this.http.get(this.apiUrl + id)
      .map((res: Response) => {
        this.onLoaded.emit();
        return res.json();
      })
      .catch(this.handleError);
  }

  updateDesign() {
    this.debug.log('api', 'updating design');
    // we can't forget about the hardware...
    this.debug.log('api', this.feature.tiles);
    const patchData = {
      'id': this.feature.id,
      'uid': this.user.uid,
      'feature_type': this.feature.feature_type,
      'design_name': this.feature.design_name,
      'project_name': this.feature.project_name,
      'specifier': this.feature.specifier,
      'width': this.feature.width,
      'length': this.feature.length,
      'units': this.feature.units,
      'material': this.feature.material,
      'tile_size': this.feature.tile_size,
      'tiles': JSON.stringify(this.feature.tiles),
      'design_data_url': this.feature.design_data_url,
      'hardware': (!!this.feature.hardware) ? JSON.stringify(this.feature.hardware) : null,
      'estimated_amount': this.feature.estimated_amount,
      'services_amount': this.feature.services_amount,
      'grid_data': JSON.stringify(this.feature.gridData),
      'quoted': this.feature.quoted,
      'archived': this.feature.archived
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.patch(this.apiUrl + this.feature.id, patchData, options)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('api', 'emitting onSaved in updateDesign');
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  saveDesign() {
    this.debug.log('api', 'saving design');
    const featureType = this.feature.setFeatureType(this.feature.feature_type);
    const patchData = {
      'uid': this.user.uid,
      'feature_type': featureType,
      'design_name': this.feature.design_name,
      'project_name': this.feature.project_name,
      'specifier': this.feature.specifier,
      'width': this.feature.width,
      'length': this.feature.length,
      'units': this.feature.units,
      'material': this.feature.material,
      'tile_size': this.feature.tile_size,
      'tiles': JSON.stringify(this.feature.tiles),
      'design_data_url': this.feature.design_data_url,
      'hardware': (!!this.feature.hardware) ? JSON.stringify(this.feature.hardware) : null,
      'estimated_amount': this.feature.estimated_amount,
      'services_amount': this.feature.services_amount,
      'grid_data': JSON.stringify(this.feature.gridData),
      'quoted': this.feature.quoted,
      'archived': this.feature.archived
    }

    return this.http.post(this.apiUrl, patchData)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug.log('api', 'emitting onSaved in saveDesign');
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  deleteDesign(id: number) {
    return this.http.delete(this.apiUrl + id);
  }

  sendEmail() {
    return this.http.get(this.apiUrl + 'email/' + this.user.uid + '/design/' + this.feature.id)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getPrices() {
    return this.http.get(this.apiUrl + 'prices')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  login(email: string, password: string) {
    this.debug.log('api', 'api login');
    const formData = {
      'email': email,
      'password': password
    }

    return this.http.post(this.loginUrl, formData)
      .map((res: Response) => {
        const api = res.json();
        if (api && !api.result.error) {
          localStorage.setItem('3formUser', JSON.stringify(api.result.user));
          this.user = api.result.user;
          this.onUserLoggedIn.emit(this.user);
          this.debug.log('api', 'user successfully logged in');
          return api;
        } else {
          this.alert.apiAlert(api.result.error);
        }
      });
  }

  logout() {
    localStorage.removeItem('3formUser');
    this.user = new User;
  }

  private handleError(error: any) {
    const errorJson = error.json();
    if (errorJson) {
      return Observable.throw(errorJson.message || 'Server Error');
    }

    return Observable.throw('Unknown Error');
  }

}
