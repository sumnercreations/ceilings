import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  constructor() { }

  success(message: string) {
    this.subject.next({type: "success", text: message});
  }

  error(message: string) {
    this.subject.next({type: "error", text: message});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  apiAlert(alert: any) {
    var body: any;
    var type: string;

    // api alerts contain a _body element that needs to be parsed as JSON
    body = JSON.parse(alert._body);

    if(body.result && body.result.error) {
      this.error(body.result.message);
    }else if(body.error) {
      this.error(body.message);
    }else{
      this.success(body.result.message);
    }
  }
}
