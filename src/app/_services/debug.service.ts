import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
  private debug;

  constructor() {
    // setup the debug for logging
    System.import('../../../node_modules/debug/src/browser.js').then(debug => {
      this.debug = debug;
    });
  }

  log(identifier: string, message: string) {
    this.debug('ceilings:' + identifier)(message);
  }

}
