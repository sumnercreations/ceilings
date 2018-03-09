import { Injectable, EventEmitter } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { DebugService } from './../_services/debug.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiService {
  public onSaved = new EventEmitter();
  public onLoaded = new EventEmitter();
  public onUserLoggedIn = new EventEmitter();
  apiUrl = 'https://' + environment.API_URL + '/ceilings/';
  loginUrl = 'https://' + environment.API_URL + '/auth/login';
  userUrl = 'https://' + environment.API_URL + '/users/';

  constructor(
    private http: HttpClient,
    private feature: Feature,
    private user: User,
    private debug: DebugService,
  ) { }

  getMyDesigns() {
    return this.http.get(this.apiUrl + 'list/' + this.user.uid)
      .catch(this.handleError);
  }

  getUserRep(uid: number) {
    this.debug.log('api', 'getting user rep');
    return this.http.get(this.userUrl + uid + '/rep')
      .catch(this.handleError);
  }

  loadDesign(id: number) {
    this.debug.log('api', 'loading design: ' + id);
    return this.http.get<any>(this.apiUrl + id);
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
      'hardware': JSON.stringify(this.feature.hardware),
      'estimated_amount': this.feature.estimated_amount,
      'services_amount': this.feature.services_amount,
      'grid_data': JSON.stringify(this.feature.gridData),
      'quoted': this.feature.quoted,
      'archived': this.feature.archived
    };

    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const options = new RequestOptions({headers: headers});

    // return this.http.patch(this.apiUrl + this.feature.id, patchData, options)
    return this.http.patch(this.apiUrl + this.feature.id, patchData)
      .map((res) => {
        this.onSaved.emit();
        this.debug.log('api', 'emitting onSaved in updateDesign');
        return res || {}
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
    return this.http.post<any>(this.loginUrl, formData);
  }

  logout() {
    localStorage.removeItem('3formUser');
    this.user = new User;
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
