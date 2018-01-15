import { TestBed, inject } from '@angular/core/testing';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        Http,
        Response,
        Headers,
        RequestOptions
      ]
    });
  });

  // RESTORE
  // it('should be created', inject([ApiService], (service: ApiService) => {
  //   expect(service).toBeTruthy();
  // }));
});
